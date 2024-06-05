import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

const BladesReportComponent = () => {
     const { selectedProcess, pluginList, setSelectedProcess } = useAppContext();
    const [headers, setHeaders] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('');
    const navigate = useNavigate();
    const [selectedPlugin, setSelectedPlugin] = useState("");
    const currentLocation = useLocation();

     useEffect(() => {
        const activeItem = selectedProcess?.find(item => item?.isActive);
        if (activeItem) {
            setHeaders(Object.keys(activeItem?.data));
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

     const handleAddTab = () => {
        const activeItemIndex = selectedProcess.findIndex(item => item?.isActive);
        if (activeItemIndex !== -1) {
            const newTab = { plugin: selectedPlugin, data: [] };
            const updatedProcess = [...selectedProcess];
            if (!updatedProcess[activeItemIndex].tabs) {
                updatedProcess[activeItemIndex].tabs = [];
            }
            const tabExists = updatedProcess[activeItemIndex].tabs.some(tab => tab.plugin === dropdownValue);
            if (!tabExists) {
                updatedProcess[activeItemIndex].tabs.push(newTab);
                setSelectedProcess(updatedProcess);
                navigate(`${selectedPlugin}`)
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
                        if (plugin.name === "CmdLine") {
                            return (
                                <option key={i} value={plugin.name}>{plugin.name}</option>
                            )
                        }
                    })}

                </select>
                <button className="rounded shadow ms-3 ps-3 pe-3 bg-themeYellow-default" onClick={handleAddTab}>Run
                </button>
            </div>
            {selectedProcess.map((item, index) => {
                if (item?.isActive) {
                    return headers.map((header) => (
                        <React.Fragment key={header}>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-themeText-light">
                            <div className="font-sm font-bold">
                                    {header}:
                                </div>
                                <div className="font-sm">
                                    {item.data[header]}
                                </div>
                            </div>
                        </React.Fragment>
                    ));
                }
                return null;
            })}
        </div>
    );
};

export default BladesReportComponent;
