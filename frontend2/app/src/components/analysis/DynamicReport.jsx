import React, { useEffect, useState } from 'react';

const DynamicReport = ({ report, searchQuery }) => {
    const [filteredReport, setFilteredReport] = useState([]);

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

    useEffect(()=>{
        console.log(searchQuery);
    }, [searchQuery]);

    const headers = filteredReport.length > 0 ? Object.keys(filteredReport[0]) : [];

    const cellStyle = {
        maxWidth: '120px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        textAlign: 'center',
    };

    const headerStyle = {
        textAlign: 'center',
    };

    return (
        <table className="min-w-full text-themeText-light">
            <thead className="bg-themeBlue-default text-white">
            <tr>
                {headers.map(header => (
                    <th key={header} className="font-bold" style={headerStyle}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {filteredReport.length > 0 ? (
                filteredReport.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}>
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
