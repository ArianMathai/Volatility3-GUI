import React, { useState, useMemo, useEffect } from 'react';

const DynamicReport = ({ report, searchQuery }) => {
    const [sortKey, setSortKey] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [filteredReport, setFilteredReport] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

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
        maxWidth: '120px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        textAlign: 'center',
    };

    // HER MÅ FRONTEND HJELPE MEG FOR DET SER HELT JÆVELIG UT
    const hoverStyle = {
        color: 'white',
        cursor: 'pointer',
        border: '1px solid white',
        borderRadius: '20%',
        padding: '0.1em'
    };


    const headerStyle = {
        textAlign: 'center',
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
                        className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}>
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