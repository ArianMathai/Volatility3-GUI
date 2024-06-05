import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

const BladesReportComponent = () => {
    const { selectedProcess, pluginList, file, osName, setSelectedProcess } = useAppContext();
    const [headers, setHeaders] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('');
    const navigate = useNavigate();
    const [selectedPlugin, setSelectedPlugin] = useState("");
    const [selectedData, setSelectedData] = useState({});
    const currentLocation = useLocation();

    useEffect(() => {
        const activeItem = selectedProcess?.find(item => item?.isActive);
        if (activeItem) {
            setHeaders(Object.keys(activeItem?.data));
            if (activeItem.tabs) {
                const activeTab = activeItem.tabs.find(tab => tab.isActive);
                if (activeTab) {
                    setSelectedData(activeTab.data[0]);
                } else {
                    setSelectedData(activeItem.data);
                }
            } else {
                setSelectedData(activeItem.data);
            }
        }
        console.log("current location:", currentLocation);
        console.log("selected process:", selectedProcess);
    }, [selectedProcess]);

    const handlePluginChange = (e) => {
        if (e.target.value === "") return;
        setSelectedPlugin(e.target.value);
        console.log("Handle plugin change: ", e.target.value);
        console.log("plugin list: ", pluginList);
    };

    const handleAddTab = async () => {
        const activeItemIndex = selectedProcess.findIndex(item => item?.isActive);
        if (activeItemIndex !== -1) {
            const pid = selectedProcess[activeItemIndex]?.data?.PID;

            if (!osName || !pid) {
                console.error('OS name or PID is missing.');
                return;
            }

            // const formData = {
            //     filepath: file.path,
            //     os: osName.os,
            //     plugin: selectedPlugin.toLowerCase(),
            //     pid: pid
            // };

            // console.log("formdata: ", formData);

            try {
                const res = await window.electronAPI.fetchProcessPluginResult(file.path, osName, selectedPlugin, pid);
                const data = await res.processes;

                const newTab = { plugin: selectedPlugin, data: data, isActive: true };
                const updatedProcess = [...selectedProcess];
                if (!updatedProcess[activeItemIndex].tabs) {
                    updatedProcess[activeItemIndex].tabs = [];
                }
                const tabExists = updatedProcess[activeItemIndex].tabs.some(tab => tab.plugin === selectedPlugin);
                if (!tabExists) {
                    updatedProcess[activeItemIndex].tabs.push(newTab);
                    setSelectedProcess(updatedProcess);
                }
            } catch (error) {
                console.error('Failed to add tab:', error);
            }
        }
    };


    if (!selectedProcess || selectedProcess.length === 0) return <div>No data available for this plugin.</div>;

    return (
        <div className="mt-4">
            <div className="mb-4">
                <select
                    className="rounded p-1 shadow"
                    value={selectedPlugin}
                    onChange={handlePluginChange}
                >
                    <option value="" disabled selected>Add another plugin</option>
                    {pluginList.map((plugin, i) => {
                        if (plugin.name === "CmdLine" || plugin.name === "Envars" || plugin.name === "DllList") {
                            return (
                                <option key={i} value={plugin.name}>{plugin.name}</option>
                            )
                        }
                    })}
                </select>
                <button className="rounded shadow ms-3 ps-3 pe-3 bg-themeYellow-default" onClick={handleAddTab}>Run</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-themeText-light">
                {Object.entries(selectedData).map(([key, value]) => (
                    <React.Fragment key={key}>
                        <div className="font-sm font-bold">{key}:</div>
                        <div className="font-sm">{value}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BladesReportComponent;
