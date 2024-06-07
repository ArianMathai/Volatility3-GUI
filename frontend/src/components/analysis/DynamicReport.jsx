import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from "../../context/Context";
import './DynamicReport.css';
import MyTreeComponent from "./MyTreeComponent";
import {useParams} from "react-router-dom";
import ExportButton from "../shared/ExportButton";

// Define buildHierarchy function outside the component
function buildHierarchy(processes) {
    const processMap = {}; // Map to quickly access processes by PID
    const rootProcesses = []; // Store top-level processes here

    // First pass: Create a map of processes by their PID
    processes.forEach(process => {
        processMap[process.PID] = { ...process, children: [] };
    });

    // Second pass: Link processes to their parent processes
    processes.forEach(process => {
        const { PID } = process;
        if (!PID) {
            console.error("PID is undefined for process:", process);
            return;
        }
        const parentPID = PID.replace(/\*/g, ''); // Remove asterisks to get parent PID

        if (!parentPID || parentPID === PID) {
            // No asterisks, this is a root process
            rootProcesses.push(processMap[PID]);
        } else {
            // Asterisks indicate parent-child relationship
            const parentProcess = processMap[parentPID];
            if (parentProcess) {
                parentProcess.children.push(processMap[PID]);
            } else {
                // If parent process is not found, add it as root process
                rootProcesses.push(processMap[PID]);
            }
        }
    });

    return rootProcesses;
}

const DynamicReport = ({ report, searchQuery }) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const [filteredReport, setFilteredReport] = useState([]);
    const {selectedProcess, setSelectedProcess, processList, processError} = useAppContext();
    const {plugin} = useParams();
    const [hoveredRow, setHoveredRow] = useState(null);
    const [clickedItem, setClickedItem] = useState(null);
    const [hierarchicalList, setHierarchicalList] = useState(null); // State to store hierarchical list
    const [isTreeView, setIsTreeView] = useState(true);

    useEffect(() => {
        if (!report || report.length === 0) {
            console.log("Report is empty or undefined");
            setFilteredReport([]);
            return;
        }

        if (!searchQuery) {
            setFilteredReport(report);
            return;
        }

        const filteredData = report.filter(item => {
            const itemValues = Object.values(item).join(' ').toLowerCase();
            const query = searchQuery.toLowerCase();
            return itemValues.includes(query);
        });

        setFilteredReport(filteredData);
    }, [report, searchQuery]);

    useEffect(() => {
        console.log('Report prop updated:', report);

        if (report && report.length > 0) {
            const hierarchicalData = buildHierarchy(report);
            setHierarchicalList(hierarchicalData); // Set the hierarchical data to state
        }
    }, [report]);

    const headers = useMemo(() => {
        return report && report.length > 0 ? Object.keys(report[0]) : [];

    }, [report]);

    const sortedAndFilteredReport = useMemo(() => {
        if (!sortKey) return filteredReport;
        let sortedItems = [...filteredReport];

        sortedItems.sort((a, b) => {
            const valA = a[sortKey] !== undefined ? (isNaN(Number(a[sortKey])) ? a[sortKey] : Number(a[sortKey])) : '';
            const valB = b[sortKey] !== undefined ? (isNaN(Number(b[sortKey])) ? b[sortKey] : Number(b[sortKey])) : '';
            console.log("Comparing values:", valA, valB);
            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortDirection === 'ascending' ? valA - valB : valB - valA;
            } else {
                return sortDirection === 'ascending' ? valA.toString().localeCompare(valB.toString()) : valB.toString().localeCompare(valA.toString());
            }
        });
        console.log("Sorted Items:", sortedItems);
        console.log("hierarchical List:", hierarchicalList);
        return sortedItems;
    }, [filteredReport, sortKey, hierarchicalList, sortDirection]);


    const sortReport = (key) => {
        let direction = 'ascending';
        if (sortKey === key && sortDirection === 'ascending') {
            direction = 'descending';
        }
        setSortKey(key);
        setSortDirection(direction);
    };

    const getSortIcon = (key) => {
        if (sortKey === key) {
            return sortDirection === 'ascending' ? '../public/img/sortDown.png' : '../public/img/sortUp.png';
        }
        return '../public/img/sortDown.png'; // Default icon
    };


    const buildProcessTree = (processes) => {
        const pidMap = {}; // Map to quickly access processes by PID
        const rootProcesses = []; // Array to store root processes
        const levelStack = []; // Stack to keep track of last processes at each level

        processes.forEach(process => {
            const {PID, PPID, ImageFileName} = process;
            const level = (PID.match(/\*/g) || []).length; // Calculate the nesting level

            // Preprocess PID to remove asterisks
            const cleanedPID = PID.substring(PID.lastIndexOf('*') + 1);

            // Combine imagefile and PID into the name property
            const name = `${ImageFileName}`;

            // Add process to pidMap
            pidMap[cleanedPID] = {...process, PID: cleanedPID, name, children: []};

            if (level === 0) {
                // If level is 0, this is the root process
                rootProcesses.push(pidMap[cleanedPID]);
                levelStack.length = 0; // Reset the stack for new root
                levelStack.push(pidMap[cleanedPID]);
            } else {
                // Find the parent process
                while (levelStack.length > level) {
                    levelStack.pop(); // Remove processes from stack until we find the correct level
                }
                const parentProcess = levelStack[level - 1];

                if (parentProcess) {
                    // Add this process as a child of its parent
                    parentProcess.children.push(pidMap[cleanedPID]);
                } else {
                    // If parent process is not found, log an error
                    console.error("Parent Process not found for:", process);
                }

                // Push this process onto the stack
                levelStack[level] = pidMap[cleanedPID];
            }
        });

        console.log("Root Processes:", rootProcesses);
        console.log("pidMap:", pidMap);

        return rootProcesses;
    };

    const ProcessTree = ({process}) => {
        return (
            <div className="tree-node">
                <div className="tree-node-content" onClick={() => handleItemClick(process)}>
                    {process.PID} - {process.Name}
                </div>
                {process.children.length > 0 && (
                    <div className="tree-children">
                        {process.children.map(child => (
                            <ProcessTree key={child.PID} process={child}/>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const processTree = useMemo(() => {
        if (sortedAndFilteredReport.length > 0 && plugin === "PsTree") {
            return buildProcessTree(sortedAndFilteredReport);
        }
        return null;
    }, [sortedAndFilteredReport, plugin]);

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleNodeClick = (nodeDatum) => {
        const {children, __rd3t, ...nodeDataWithoutChildren} = nodeDatum;
        console.log('Clicked node data:', nodeDataWithoutChildren);
        handleItemClick(nodeDataWithoutChildren);
    };


    const handleItemClick = (item) => {
        const updatedSelectedProcess = selectedProcess.map(process => ({
            ...process,
            isActive: false,
        }));

        const newItem = {isActive: true, data: item, tabs: []};
        const indexOfClickedItem = updatedSelectedProcess.findIndex(process => process.data.PID === item.PID);

        if (indexOfClickedItem !== -1) {
            updatedSelectedProcess[indexOfClickedItem].isActive = newItem.isActive;
            updatedSelectedProcess[indexOfClickedItem].data = newItem.data;
        } else {
            updatedSelectedProcess.push(newItem);
        }

        setSelectedProcess(updatedSelectedProcess);
        setClickedItem(item);
    };

    if (processList.length === 0) {
        const currentPluginError = processError.find((error) => error.plugin === plugin);

        return (
            currentPluginError ? (
                <tr>
                    <td colSpan={headers.length} className="text-center text-themeText-light m-auto">{currentPluginError.error}</td>
                </tr>
            ) : (
                <tr>
                    <td colSpan={headers.length} className="text-center text-themeText-light m-auto">
                        There are no currently selected plugins to display.
                        Please select and run a plugin to display.
                    </td>
                </tr>
            )
        );
    }

    const toggleView = () => {
        setIsTreeView(!isTreeView);
    };


    return (
        <div>
            {plugin === "PsTree" && (
                <button
                    onClick={toggleView}
                    className=" mt-3 mb-3 border rounded shadow p-1 cursor-pointer bg-themeGray-default text-black"
                >
                    {isTreeView ? 'Switch to List View' : 'Switch to Tree View'}
                </button>
            )}

            {plugin === "PsTree" && isTreeView ? (
                <div style={{width: '100vw', height: '70vh', position: 'relative'}}>
                    <MyTreeComponent processTree={processTree} onNodeClick={handleNodeClick}/>
                </div>
            ) : (
                <div>
                    <table className="table-auto w-full text-themeText-light text-xs">
                        <thead className="bg-themeBlue-default"
                               style={{position: 'sticky', top: 0}}>
                        <tr>
                            {headers.map((header) => (
                                <th key={header} className="font-bold py-3 text-left px-4 text-xs">
                                    <button
                                        onClick={() => sortReport(header)}
                                        className="flex items-center"
                                    >
                                        {header}
                                        <img className="inline-block w-4 ml-2" src={getSortIcon(header)}
                                             alt="sortingIcon"/>
                                    </button>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {sortedAndFilteredReport.length > 0 ? (
                            sortedAndFilteredReport.map((item, index) => {
                                const isClicked = item === clickedItem;
                                const isHovered = index === hoveredRow;
                                const rowClassName = isClicked
                                    ? 'bg-themeYellow-default text-black'
                                    : index % 2 === 0
                                        ? 'bg-themeBlue-default'
                                        : 'bg-themeBlue-dark';
                                const textClassName = isClicked ? 'text-black' : 'text-themeText-light';

                                return (
                                    <tr
                                        key={index}
                                        onMouseEnter={() => handleRowHover(index)}
                                        onMouseLeave={() => handleRowHover(null)}
                                        onClick={() => handleItemClick(item)}
                                        className={`${rowClassName} ${isHovered && !isClicked ? 'hover:bg-themeHover' : ''}`}
                                    >
                                        {headers.map((header) => (
                                            <td className={`p-2 ${textClassName} text-xs`} key={header}>
                                                {item[header]}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="text-center text-themeText-light">No data
                                    available for this
                                    plugin.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}


export default DynamicReport;