import React, {useState, useMemo, useEffect} from 'react';

const DynamicReport = ({ report }) => {

    const [sortKey, setSortKey] = useState(null);
    const [sorted, setSorted] = useState(false);

    const headers = useMemo(() => {
        return report && report.length > 0 ? Object.keys(report[0]) : [];
    }, [report]);

    const cellStyle = {
        maxWidth: '120px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        textAlign: 'center',
    };

    const headerStyle = {
        textAlign: 'center',
    };

    const sortReport = (key) => {
        setSortKey(key);
        setSorted(true);
    };



    const sortedReport = useMemo(() => {
        if (!sorted || !sortKey) return report;
        let sortedItems = [...report];

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
    }, [report, sortKey, sorted]);
/*
    useEffect(() => {
        console.log("Report = ", report)
        report.forEach((item) => console.log(item.PID));
        console.log("Sorted report = ", sortedReport)
        sortedReport.forEach((item) => console.log(item.PID));
    }, [report, sortedReport]);

 */


    if (!report || report.length === 0) {
        return <div>No data available for this plugin.</div>;
    }

    return (
        <table className="min-w-full text-themeText-light">
            <thead className="bg-themeBlue-default text-white">
            <tr>
                {headers.map(header => (
                    <th key={header} className="font-bold" style={headerStyle}>
                        <button onClick={() => sortReport(header)}>{header}</button>
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {sortedReport.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}>
                    {headers.map((header) => (
                        <td key={header} style={cellStyle}>{item[header]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DynamicReport;