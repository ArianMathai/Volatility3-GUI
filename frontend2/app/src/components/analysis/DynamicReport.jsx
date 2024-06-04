import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from "../../context/Context";


const DynamicReport = ({ report, searchQuery }) => {
    const [sortKey, setSortKey] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [filteredReport, setFilteredReport] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);
    const { selectedProcess, setSelectedProcess } = useAppContext(); // Added setPlugins for updating plugins array
    const [hoveredRow, setHoveredRow] = useState(null);

    


    // Filter logic
    useEffect(() => {
        if (!report || report.length === 0) {
            setFilteredReport([]);
            return;
        }

        if (!searchQuery) {
            setFilteredReport(report);
            return;
        }

        const filteredData = report.filter(item => {
            return Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });

        setFilteredReport(filteredData);
    }, [report, searchQuery]);
  

    // Sorting logic
    const sortedAndFilteredReport = useMemo(() => {
        if (!sorted || !sortKey) return filteredReport;
        let sortedItems = [...filteredReport];

        // Sorts as numbers or strings based on datatype
        sortedItems.sort((a, b) => {
            const valA = isNaN(Number(a[sortKey])) ? a[sortKey] : Number(a[sortKey]);
            const valB = isNaN(Number(b[sortKey])) ? b[sortKey] : Number(b[sortKey]);

            if (typeof valA === 'number' && typeof valB === 'number') {
                return valA - valB;
            } else {
                return valA.toString().localeCompare(valB.toString());
            }
        });
        return sortedItems;
    }, [filteredReport, sortKey, sorted]);

    const sortReport = (key) => {
        setSortKey(key);
        setSorted(!sorted); // Toggle sorted state to trigger re-sorting
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

    // HER MÅ FRONTEND HJELPE MEG FOR DET SER HELT JÆVELIG UT
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

    // Function to handle row hover
    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    // Determine row background color based on hover state
    const getRowColor = (index) => {
        return index === hoveredRow ? 'rgba(125, 211, 252, 0.6)' : (index % 2 === 0 ? 'rgb(8, 47, 73)' : 'rgb(12, 74, 110)');
    };

    // Function to handle item selection
    const handleItemClick = (item) => {
        // Set isActive property of all items to false
        const updatedSelectedProcess = selectedProcess.map(process => ({
            ...process,
            isActive: false
        }));

        // Find the clicked item and set its isActive property to true
        const newItem = { isActive: true, data: item };
        const indexOfClickedItem = updatedSelectedProcess.findIndex(process => process.data.PID === item.PID);

        // If the clicked item exists, update its isActive property to true
        if (indexOfClickedItem !== -1) {
            updatedSelectedProcess[indexOfClickedItem] = newItem;
        } else {
            // If the clicked item doesn't exist, add it to the selectedProcess array
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