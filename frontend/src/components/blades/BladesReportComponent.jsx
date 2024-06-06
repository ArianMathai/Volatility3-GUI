import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

const BladesReportComponent = () => {
    const { selectedProcess, pluginList, processList, file, osName, setSelectedProcess } = useAppContext();
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

            const cleanedPID = pid.substring(pid.lastIndexOf('*') + 1)

            try {
                const res = await window.electronAPI.fetchProcessPluginResult(file.path, osName, selectedPlugin, cleanedPID);
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

        // Search for the parent process in processList
        const parentProcess = processList[0]?.processes?.find(item => item?.PID.substring(item?.PID.lastIndexOf('*') + 1) === cleanedParentPID);

        if (parentProcess) {
            const updatedProcess = [...selectedProcess];

            // Check if the parent process is already in selectedProcess array
            const parentIndex = updatedProcess.findIndex(item => item?.data?.PID.substring(item?.data?.PID.lastIndexOf('*') + 1) === cleanedParentPID);
            if (parentIndex === -1) {
                // Add the parent process to selectedProcess array
                updatedProcess.push({ data: { ...parentProcess }, isActive: true, tabs: [] });
                console.log('Added new parent process:', parentProcess);
            } else {
                // Update isActive to true for the existing parent process
                updatedProcess[parentIndex].isActive = true;
                console.log('Found existing parent process:', parentProcess);
            }

            // Set isActive to false for the current selected process
            updatedProcess[activeItemIndex].isActive = false;
            console.log('Updated selectedProcess array:', updatedProcess);

            setSelectedProcess(updatedProcess);
        } else {
            console.error('Parent process not found.');
        }
    }
};




    if (!selectedProcess || selectedProcess.length === 0) return <div>No data available for this plugin.</div>;

  return (
      <div className="mt-4">
          <div className="mb-4">
              <select
                  className="rounded p-1 ms-3 shadow"
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
              <button className="rounded shadow ms-3 p-1 ps-3 pe-3 bg-themeYellow-default" onClick={handleAddTab}>Run
              </button>
          </div>
          <div className="relative">
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-themeText-light">
                  {Object?.entries(selectedData)?.map(([key, value]) => (
                      <React.Fragment key={key}>
                          <div className="font-sm font-bold">{key}:</div>
                          <div className="font-sm">{value}</div>
                      </React.Fragment>
                  ))}
              </div>

          </div>
          <button className="rounded ms-3 shadow p-1 ps-3 pe-3 bg-themeYellow-default" onClick={goToParentProcess}>Go to
              Parent
          </button>
      </div>
  );
};

export default BladesReportComponent;
