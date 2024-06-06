
export const acceptedPlugins = {
  linux: [
    "Bash", "Capabilities", "Capabilities Data", "Taskdata", "Check Afinfo",
    "Check Creds", "Check Idt", "Check Modules", "Check Syscall", "Elfs",
    "Envars", "Iomem", "Keyboard Notifiers", "Kmsg", "ABCKmsg", "Desc State Enum",
    "Kmsg Five Ten", "Kmsg Legacy", "Lsmod", "Malfind", "Mount Info",
    "Mount Info Data", "Proc", "Psaux", "Pslists", "Psscan",
    "Desc Exit State Enum", "Pstree", "Sockstat", "Sock Handlers", "Tty Check",
    "Vmayarascan"
  ],
  mac: [
    "Bash", "Check Syscall", "Check Trap Table", "Ifconfig", "Kauth Listeners",
    "Kauth Scopes", "Kevents", "List Files", "Lsmod", "Lsof", "Malfind",
    "Mount", "Netstat", "Proc Maps", "Psaux", "Pslist", "Pstree",
    "Socket Filters", "Timers", "Trustedbsd", "VFSevents"
  ],
  windows: [
    "cmdline", "dlllist", "dumpfiles", "envars",   "getsids",
    "handles", "ldrmodules", "malfind",  "memmap", "privileges",
    "psList", "psscan", "pstree", "sessions",
  ]
};



// windows: [
//     "bigpools l", "cachedump l", "callbacks l", "cmdline", "crashinfo l",
//     "devicetree l", "dlllist", "driverirp l", "drivermodule l", "driverscan l",
//     "dumpfiles", "envars", "filescan l", "getservicesids l", "getsids",
//     "handles", "hashdump l", "info l", "joblinks l", "ldrmodules",
//     "lsadump l", "malfind", "mbrscan --FULL l", "memmap", "mftscanads l",
//     "mftscan l", "modscan l", "modules l", "mutantscan l", "netscan l",
//     "netstat l", "poolscanner l", "privileges", "psList", "psscan",
//     "pstree", "sessions", "skeletonkeycheck l", "SSDT ll", "strings l",
//     "svcscan ?", "symlinkscan ?", "vadinfo ?", "vadwalk ?", "vadyarascan ?",
//     "verinfo ?", "virtmap ?"
//   ]
