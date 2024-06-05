import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from "../../context/Context";

const DynamicReport = ({ report, searchQuery }) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const [filteredReport, setFilteredReport] = useState([]);
    const { selectedProcess, setSelectedProcess, processList } = useAppContext();
    const [hoveredRow, setHoveredRow] = useState(null);
    const [clickedItem, setClickedItem] = useState(null);

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
        return sortedItems;
    }, [filteredReport, sortKey, sortDirection]);

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

    const headers = useMemo(() => {
        return report && report.length > 0 ? Object.keys(report[0]) : [];
    }, [report]);

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleItemClick = (item) => {
        const updatedSelectedProcess = selectedProcess.map(process => ({
            ...process,
            isActive: false,
        }));

        const newItem = { isActive: true, data: item, tabs: [] };
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
        return (
            <tr>
                <td colSpan={headers.length} className="text-center">There are no currently selected plugins to display. Please select and run a plugin to display.</td>
            </tr>
        )
    }

    return (
        <table className="min-w-full text-themeText-light text-xs"> {/* Added text-xs class for smaller text */}
            <thead className="bg-themeBlue-default">
            <tr>
                {headers.map((header) => (
                    <th key={header} className="font-bold text-left px-4 text-xs"> {/* Added text-xs class for smaller text */}
                        <button
                            onClick={() => sortReport(header)}
                            className="flex items-center"
                        >
                            {header}
                            <img className="inline-block w-4 ml-2" src={getSortIcon(header)} alt="sortingIcon" />
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
                                <td className={`p-2 ${textClassName} text-xs`} key={header}> {/* Added text-xs class for smaller text */}
                                    {item[header]}
                                </td>
                            ))}
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td colSpan={headers.length} className="text-center">No data available for this plugin.</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default DynamicReport;