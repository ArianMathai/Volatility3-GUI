import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import { acceptedPlugins } from "./acceptedProcessPlugins";
import ExportButton from "../shared/ExportButton";
import Loader from "../shared/Loader";

const BladesReportComponent = () => {
    const { selectedProcess, pluginList, processList, file, osName, setSelectedProcess, setError, error } = useAppContext();
    const [headers, setHeaders] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('');
    const navigate = useNavigate();
    const [selectedPlugin, setSelectedPlugin] = useState("");
    const [selectedData, setSelectedData] = useState([]);
    const [acceptedProcessPlugins, setAcceptedProcessPlugins] = useState([]);
    const [report, setReport] = useState([]);
    const currentLocation = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [tooManyResults, setTooManyResults] = useState({
        isBig: false,
        message: ``
    })

    useEffect(() => {
        const activeItem = selectedProcess?.find(item => item?.isActive);
        if (activeItem) {
            if (activeItem.tabs) {
                const activeTab = activeItem.tabs.find(tab => tab.isActive);
                if (activeTab) {
                    setHeaders(Object.keys(activeTab.data[0]));
                    setSelectedData(activeTab.data.slice(0, 200));
                } else {
                    setHeaders(Object.keys(activeItem.data));
                    setSelectedData([activeItem.data]);
                }
            } else {
                setHeaders(Object.keys(activeItem.data));
                setSelectedData([activeItem.data]);
            }
        }
        console.log(acceptedProcessPlugins);
        console.log("selected data:", selectedData);
        console.log("selected processes:", selectedProcess);
        console.log("report:", report);
        console.log(acceptedPlugins[osName]);
    }, [selectedProcess]);

    useEffect(() => {
        setAcceptedProcessPlugins(acceptedPlugins[osName]);
    }, [osName]);

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

            const cleanedPID = pid.substring(pid.lastIndexOf('*') + 1);

            try {
                setIsLoading(true);
                const res = await window.electronAPI.fetchProcessPluginResult(file.path, osName, selectedPlugin, cleanedPID);
                const data = await res.processes;
                setReport(res.processes);

                const tempFormat = {
                    isBig: true,
                    message: `Output returned too many objects (${data.length}). Export to csv to
                    see full result`
                }

                if (data.length > 100) {
                    setTooManyResults(tempFormat)
                    setTimeout(() => {
                        setTooManyResults({
                            isBig: false,
                            message: ``
                        })
                    }, 5000)
                } else {
                    setTooManyResults({
                    isBig: false,
                    message: ``
                    })

                }

                console.log(res)

                const newTab = { plugin: selectedPlugin, data: data.slice(0, 200), isActive: true };
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
            } finally {
                setIsLoading(false);
            }
        }
    };

    const goToParentProcess = () => {
        const activeItemIndex = selectedProcess.findIndex(item => item?.isActive);
        if (activeItemIndex !== -1) {
            const parentPID = selectedProcess[activeItemIndex]?.data?.PPID;
            const cleanedParentPID = parentPID.substring(parentPID.lastIndexOf('*') + 1);
            if (!parentPID) {
                console.error('Parent PID is missing.');
                return;
            }

            console.log("PPID", cleanedParentPID);

            processList[0]?.processes?.map(item => {
                console.log(item?.PID.substring(item?.PID.lastIndexOf('*') + 1))
            })

            const parentProcess = processList[0]?.processes?.find(item => {
                const lastPart = item?.PID.substring(item?.PID.lastIndexOf('*') + 1).trim();
                return lastPart === cleanedParentPID.trim();
            });


            if (parentProcess) {
                const updatedProcess = [...selectedProcess];

                const parentIndex = updatedProcess.findIndex(item => {
                    const lastPart = item?.data?.PID.substring(item?.data?.PID.lastIndexOf('*') + 1).trim();
                    return lastPart === cleanedParentPID.trim();
                });

                if (parentIndex === -1) {
                    updatedProcess.push({ data: { ...parentProcess }, isActive: true, tabs: [] });
                    console.log('Added new parent process:', parentProcess);
                } else {
                    updatedProcess[parentIndex].isActive = true;
                    console.log('Found existing parent process:', parentProcess);
                }

                updatedProcess[activeItemIndex].isActive = false;
                console.log('Updated selectedProcess array:', updatedProcess);

                setSelectedProcess(updatedProcess);
            } else {
                console.error('Parent process not found.');
            }
        }
    };

    const removeMessage = () => {
        setIsLoading(false);
        setTimeout(() => {
            setMessage("");
        }, 6000);
    }

    const handleDumpClick = async (process, plugin) => {
        setIsLoading(true);
        try {
            const res = await window.fileAPI.dumpFilePid(file.path, osName, plugin, process.data.PID);

            setMessage(res.message);
            removeMessage();
            setError("");

        } catch (error) {
            setError('Failed to dump file');
        }

    };

    const renderDumpButton = () => {
        if (!selectedProcess) return null;

        const activeItem = selectedProcess.find(item => item?.isActive);
        if (!activeItem || !activeItem.tabs) return null;

        const activeTab = activeItem.tabs.find(tab => tab.isActive);
        if (!activeTab) return null;

        const pluginWithDumpFlag = acceptedProcessPlugins.find(plugin => plugin.name === activeTab.plugin && plugin.flags.includes('dump'));
        if (pluginWithDumpFlag) {
            return (
                <button
                    className="rounded ms-3 shadow p-1 ps-3 pe-3 bg-themeYellow-default hover:bg-themeYellow-light"
                    onClick={() => handleDumpClick(activeItem, activeTab.plugin)}
                >
                    Dump
                </button>
            );
        }

        return null;
    };

    if (!selectedProcess || selectedProcess.length === 0) return <div>No data available for this plugin.</div>;

    return (
        <div className="mt-4">
            <div className="mb-4 flex flex-wrap gap-3 items-center">
                <select
                    className="rounded p-1 ms-3 shadow"
                    value={selectedPlugin}
                    onChange={handlePluginChange}
                >
                    <option value="" disabled selected>Select Plugin</option>
                    {acceptedProcessPlugins?.map((plugin, i) => (
                        <option key={i} value={plugin.name}>{plugin.name}</option>
                    ))}
                </select>
                <button
                    className={`rounded shadow ms-3 p-1 ps-3 pe-3 ${selectedPlugin ? 'bg-themeYellow-default hover:bg-themeYellow-light' : 'bg-themeGray-default hover:bg-themeGray-default'}`}
                    onClick={handleAddTab}>Run
                </button>
                {renderDumpButton()}
                <button className="rounded ms-3 shadow p-1 ps-3 pe-3 whitespace-nowrap bg-themeYellow-default hover:bg-themeYellow-light"
                        onClick={goToParentProcess}>Go to Parent
                </button>

                {selectedProcess?.find(item => item.isActive)?.tabs?.find(item => item.isActive)?.plugin &&

                    <ExportButton report={report} plugin={selectedProcess?.find(item => item.isActive)?.tabs?.find(item => item.isActive)?.plugin
                    + `_${selectedProcess.find(item => item.isActive).data.PID}_` + "blade"} className="rounded ms-3 shadow p-1 ps-3 pe-3 bg-themeYellow-default hover:bg-themeYellow-light" />}
                    <Loader isLoading={isLoading} className="absolute"/>

            </div>
              {message && <h4 className="ms-3" style={{color: "yellow"}}>{message}</h4>}
              {tooManyResults.isBig && <h4 className="ms-3" style={{color: "yellow"}}>{tooManyResults.message}</h4>}
              
            <div className="relative">
                <table className="table-auto w-full text-themeText-light text-xs">
                    <thead className="bg-themeBlue-default" style={{position: 'sticky', top: 0}}>
                    <tr>
                        {headers.map(header => (
                            <th key={header} className="font-bold py-3 text-left px-4 text-xs max-w-xs">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {selectedData.length > 0 ? (
                        selectedData.map((item, index) => {
                            const rowClassName = index % 2 === 0 ? 'bg-themeBlue-dark' : 'bg-themeBlue-default';
                            const textClassName = 'text-themeText-light';

                            return (
                                <tr key={index} className={rowClassName}>
                                    {headers.map(header => (
                                        <td key={header}
                                            className={`p-2 ${textClassName} text-xs max-w-xs break-words whitespace-normal`}>
                                            {item[header]}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="text-center text-themeText-light">
                                No data available for this plugin.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BladesReportComponent;
