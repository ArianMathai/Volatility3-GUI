# This file is Copyright 2019 Volatility Foundation and licensed under the Volatility Software License 1.0
# which is available at https://www.volatilityfoundation.org/license/vsl-v1.0
#
import contextlib
import datetime
import logging
import ntpath
from typing import List, Optional, Type

from volatility3.framework import constants, exceptions, interfaces, renderers
from volatility3.framework.configuration import requirements
from volatility3.framework.renderers import conversion, format_hints
from volatility3.framework.symbols import intermed
from volatility3.framework.symbols.windows.extensions import pe
from volatility3.plugins import timeliner
from volatility3.plugins.windows import info, pslist, psscan

vollog = logging.getLogger(__name__)


class DllList(interfaces.plugins.PluginInterface, timeliner.TimeLinerInterface):
    """Lists the loaded modules in a particular windows memory image."""

    _required_framework_version = (2, 0, 0)
    _version = (2, 0, 0)

    @classmethod
    def get_requirements(cls) -> List[interfaces.configuration.RequirementInterface]:
        # Since we're calling the plugin, make sure we have the plugin's requirements
        return [
            requirements.ModuleRequirement(
                name="kernel",
                description="Windows kernel",
                architectures=["Intel32", "Intel64"],
            ),
            requirements.VersionRequirement(
                name="pslist", component=pslist.PsList, version=(2, 0, 0)
            ),
            requirements.VersionRequirement(
                name="psscan", component=psscan.PsScan, version=(1, 1, 0)
            ),
            requirements.VersionRequirement(
                name="info", component=info.Info, version=(1, 0, 0)
            ),
            requirements.ListRequirement(
                name="pid",
                element_type=int,
                description="Process IDs to include (all other processes are excluded)",
                optional=True,
            ),
            requirements.IntRequirement(
                name="offset",
                description="Process offset in the physical address space",
                optional=True,
            ),
            requirements.BooleanRequirement(
                name="dump",
                description="Extract listed DLLs",
                default=False,
                optional=True,
            ),
        ]

    @classmethod
    def dump_pe(
        cls,
        context: interfaces.context.ContextInterface,
        pe_table_name: str,
        dll_entry: interfaces.objects.ObjectInterface,
        open_method: Type[interfaces.plugins.FileHandlerInterface],
        layer_name: str = None,
        prefix: str = "",
    ) -> Optional[interfaces.plugins.FileHandlerInterface]:
        """Extracts the complete data for a process as a FileInterface

        Args:
            context: the context to operate upon
            pe_table_name: the name for the symbol table containing the PE format symbols
            dll_entry: the object representing the module
            layer_name: the layer that the DLL lives within
            open_method: class for constructing output files

        Returns:
            An open FileHandlerInterface object containing the complete data for the DLL or None in the case of failure
        """
        try:
            try:
                name = dll_entry.FullDllName.get_string()
            except exceptions.InvalidAddressException:
                name = "UnreadableDLLName"

            if layer_name is None:
                layer_name = dll_entry.vol.layer_name

            file_handle = open_method(
                "{}{}.{:#x}.{:#x}.dmp".format(
                    prefix,
                    ntpath.basename(name),
                    dll_entry.vol.offset,
                    dll_entry.DllBase,
                )
            )

            dos_header = context.object(
                pe_table_name + constants.BANG + "_IMAGE_DOS_HEADER",
                offset=dll_entry.DllBase,
                layer_name=layer_name,
            )

            for offset, data in dos_header.reconstruct():
                file_handle.seek(offset)
                file_handle.write(data)
        except (
            IOError,
            exceptions.VolatilityException,
            OverflowError,
            ValueError,
        ) as excp:
            vollog.debug(f"Unable to dump dll at offset {dll_entry.DllBase}: {excp}")
            return None
        return file_handle

    def _generator(self, procs):
        pe_table_name = intermed.IntermediateSymbolTable.create(
            self.context, self.config_path, "windows", "pe", class_types=pe.class_types
        )

        kernel = self.context.modules[self.config["kernel"]]

        kuser = info.Info.get_kuser_structure(
            self.context, kernel.layer_name, kernel.symbol_table_name
        )
        nt_major_version = int(kuser.NtMajorVersion)
        nt_minor_version = int(kuser.NtMinorVersion)
        # LoadTime only applies to versions higher or equal to Window 7 (6.1 and higher)
        dll_load_time_field = (nt_major_version > 6) or (
            nt_major_version == 6 and nt_minor_version >= 1
        )
        for proc in procs:
            proc_id = proc.UniqueProcessId
            proc_layer_name = proc.add_process_layer()

            for entry in proc.load_order_modules():
                BaseDllName = FullDllName = renderers.UnreadableValue()
                with contextlib.suppress(exceptions.InvalidAddressException):
                    BaseDllName = entry.BaseDllName.get_string()
                    # We assume that if the BaseDllName points to an invalid buffer, so will FullDllName
                    FullDllName = entry.FullDllName.get_string()

                if dll_load_time_field:
                    # Versions prior to 6.1 won't have the LoadTime attribute
                    # and 32bit version shouldn't have the Quadpart according to MSDN
                    try:
                        DllLoadTime = conversion.wintime_to_datetime(
                            entry.LoadTime.QuadPart
                        )
                    except exceptions.InvalidAddressException:
                        DllLoadTime = renderers.UnreadableValue()
                else:
                    DllLoadTime = renderers.NotApplicableValue()

                file_output = "Disabled"
                if self.config["dump"]:
                    file_handle = self.dump_pe(
                        self.context,
                        pe_table_name,
                        entry,
                        self.open,
                        proc_layer_name,
                        prefix=f"pid.{proc_id}.",
                    )
                    file_output = "Error outputting file"
                    if file_handle:
                        file_handle.close()
                        file_output = file_handle.preferred_filename
                try:
                    dllbase = format_hints.Hex(entry.DllBase)
                except exceptions.InvalidAddressException:
                    dllbase = renderers.NotAvailableValue()

                try:
                    size_of_image = format_hints.Hex(entry.SizeOfImage)
                except exceptions.InvalidAddressException:
                    size_of_image = renderers.NotAvailableValue()

                yield (
                    0,
                    (
                        proc.UniqueProcessId,
                        proc.ImageFileName.cast(
                            "string",
                            max_length=proc.ImageFileName.vol.count,
                            errors="replace",
                        ),
                        dllbase,
                        size_of_image,
                        BaseDllName,
                        FullDllName,
                        DllLoadTime,
                        file_output,
                    ),
                )

    def generate_timeline(self):
        kernel = self.context.modules[self.config["kernel"]]
        for row in self._generator(
            pslist.PsList.list_processes(
                context=self.context,
                layer_name=kernel.layer_name,
                symbol_table=kernel.symbol_table_name,
            )
        ):
            _depth, row_data = row
            if not isinstance(row_data[6], datetime.datetime):
                continue
            description = (
                "DLL Load: Process {} {} Loaded {} ({}) Size {} Offset {}".format(
                    row_data[0],
                    row_data[1],
                    row_data[4],
                    row_data[5],
                    row_data[3],
                    row_data[2],
                )
            )
            yield (description, timeliner.TimeLinerType.CREATED, row_data[6])

    def run(self):
        filter_func = pslist.PsList.create_pid_filter(self.config.get("pid", None))
        kernel = self.context.modules[self.config["kernel"]]

        if self.config["offset"]:
            procs = psscan.PsScan.scan_processes(
                self.context,
                kernel.layer_name,
                kernel.symbol_table_name,
                filter_func=psscan.PsScan.create_offset_filter(
                    self.context,
                    kernel.layer_name,
                    self.config["offset"],
                ),
            )
        else:
            procs = pslist.PsList.list_processes(
                context=self.context,
                layer_name=kernel.layer_name,
                symbol_table=kernel.symbol_table_name,
                filter_func=filter_func,
            )

        return renderers.TreeGrid(
            [
                ("PID", int),
                ("Process", str),
                ("Base", format_hints.Hex),
                ("Size", format_hints.Hex),
                ("Name", str),
                ("Path", str),
                ("LoadTime", datetime.datetime),
                ("File output", str),
            ],
            self._generator(procs=procs),
        )
