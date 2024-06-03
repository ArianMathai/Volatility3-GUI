import React from 'react';

const DynamicReport = ({ report }) => {
    if (!report || report.length === 0) return <div>No data available for this plugin.</div>;

    const headers = Object.keys(report[0]);

    const cellStyle = {
        maxWidth: '120px',  // Set your desired max width here
        whiteSpace: 'normal',  // Allow text to wrap down
        wordWrap: 'break-word',  // Break long words
        textAlign: 'center',  // Center-align text
    };

    const headerStyle = {
        textAlign: 'center',  // Center-align text
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
            {report.length > 0 ? (
                report.map((item, index) => (
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
