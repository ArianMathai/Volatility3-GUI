import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from "../../context/Context";

const DynamicReport = ({ report, searchQuery }) => {
    const [sortKey, setSortKey] = useState(null);
    const [filteredReport, setFilteredReport] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const { selectedProcess, setSelectedProcess } = useAppContext();
    const [hoveredRow, setHoveredRow] = useState(null);

    useEffect(() => {
        // console.log("Within DynamicReport component:", searchQuery);
        // console.log("Report Data:", report);
    }, [searchQuery, report]);

    // Filter logic
    useEffect(() => {
        // console.log("Filtering report with searchQuery:", searchQuery);
        if (!report || report.length === 0) {
            console.log("Report is empty or undefined");
            setFilteredReport([]);
            return;
        }

        if (!searchQuery) {
            // console.log("Search query is empty, setting filtered report to full report");
            setFilteredReport(report);
            return;
        }

        const filteredData = report.filter(item => {
            const itemValues = Object.values(item).join(' ').toLowerCase();
            const query = searchQuery.toLowerCase();
            // console.log("Filtering item:", itemValues, "with query:", query);
            return itemValues.includes(query);
        });

        // console.log("Filtered Data:", filteredData);
        setFilteredReport(filteredData);
    }, [report, searchQuery]);


    const sortedAndFilteredReport = useMemo(() => {

        if (!sortKey) return filteredReport;

        let sortedItems = [...filteredReport];

        console.log("Sorting logic triggered with sortKey:", sortKey, "and sorted:", sorted);

        // Sorts as numbers or strings based on datatype
        sortedItems.sort((a, b) => {
            const valA = isNaN(Number(a[sortKey])) ? a[sortKey] : Number(a[sortKey]);
            const valB = isNaN(Number(b[sortKey])) ? b[sortKey] : Number(b[sortKey]);

            console.log("Comparing values:", valA, valB);

            if (typeof valA === 'number' && typeof valB === 'number') {
                return valA - valB;
            } else {
                return valA.toString().localeCompare(valB.toString());
            }
        });
        console.log("Sorted Items:", sortedItems);
        return sortedItems;
    }, [filteredReport, sortKey]);



    const sortReport = (key) => {
        setSortKey(key); // Set the sort key and always sort in ascending order
    };

    const headers = useMemo(() => {
        return report && report.length > 0 ? Object.keys(report[0]) : [];
    }, [report]);

    const cellStyle = {
        textAlign: 'center',
        maxWidth: '120px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    };

    const hoverStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '0.25em',
        transition: 'background-color 0.2s ease-in-out',
        outline: 'none',
    };

    const headerStyle = {
        textAlign: 'center',
    };

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const getRowColor = (index) => {
        return index === hoveredRow ? 'rgba(125, 211, 252, 0.6)' : (index % 2 === 0 ? 'rgb(8, 47, 73)' : 'rgb(12, 74, 110)');
    };

    const handleItemClick = (item) => {
        const updatedSelectedProcess = selectedProcess.map(process => ({
            ...process,
            isActive: false
        }));

        const newItem = { isActive: true, data: item };
        const indexOfClickedItem = updatedSelectedProcess.findIndex(process => process.data.PID === item.PID);

        if (indexOfClickedItem !== -1) {
            updatedSelectedProcess[indexOfClickedItem] = newItem;
        } else {
            updatedSelectedProcess.push(newItem);
        }

        setSelectedProcess(updatedSelectedProcess);
    };

    if (!report || report.length === 0) {
        return <div>No data available for this plugin.</div>;
    }

    return (
        <table className="min-w-full text-themeText-light">
            <thead className="bg-themeBlue-default text-white">
            <tr>
                {headers.map((header, index) => (
                    <th key={header} className="font-bold" style={headerStyle}>
                        <button
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            style={hoverIndex === index ? hoverStyle : null}
                            onClick={() => sortReport(header)}
                        >
                            {header}
                        </button>
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {sortedAndFilteredReport.length > 0 ? (
                sortedAndFilteredReport.map((item, index) => (
                    <tr key={index}
                        className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}
                        style={{ backgroundColor: getRowColor(index) }}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={() => handleRowHover(null)}
                        onClick={() => handleItemClick(item)}>
                        {headers.map((header) => (
                            <td key={header} style={cellStyle}>{item[header]}</td>
                        ))}
                    </tr>
                ))
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
