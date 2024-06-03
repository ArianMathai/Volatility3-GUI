import React from 'react';

const DynamicReport = ({ report }) => {
    if (!report || report.length === 0) return <div>No data available for this plugin.</div>;

    const headers = Object.keys(report[0]);

    return (
        <table className="min-w-full text-themeText-light">
            <thead className="bg-themeBlue-default text-white">
            <tr>
                {headers.map(header => (
                    <th key={header} className="font-bold">{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {report.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}>
                    {headers.map(header => (
                        <td key={header}>{row[header]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DynamicReport;
