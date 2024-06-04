import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from "../../context/Context";

const DynamicReport = ({ report, searchQuery }) => {
    const [sortKey, setSortKey] = useState(null);
    const [filteredReport, setFilteredReport] = useState([]);
    const { selectedProcess, setSelectedProcess } = useAppContext();
    const [hoveredRow, setHoveredRow] = useState(null);

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


    const sortedAndFilteredReport = useMemo(() => {
        if (!sortKey) return filteredReport;
        let sortedItems = [...filteredReport];

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
        setSortKey(key);
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
            <thead className="bg-themeBlue-default">
            <tr>
                {headers.map((header, index) => (
                    <th key={header} className="font-bold text-left">
                        <button
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
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={() => handleRowHover(null)}
                        onClick={() => handleItemClick(item)}>
                        {headers.map((header) => (
                            <td className={`p-2 text-themeText-light ${index % 2 === 0 ? 'bg-themeBlue-default' : 'bg-themeBlue-dark'}`} key={header}>{item[header]}</td>
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