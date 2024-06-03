import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

export const AnalysisReportComponent = () => {
    const { processList } = useAppContext();
    const { plugin } = useParams();  // Get the last URL parameter
    const location = useLocation();  // Get the current location
    const [report, setReport] = useState([]);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        console.log("Current Path:", location.pathname);
    }, [location]);

    useEffect(() => {
        console.log("Current Plugin:", plugin);
        console.log("processList:");
        console.log(processList);

        const currentReport = processList.find((element) => element.plugin === plugin);
        if (currentReport) {
            setReport(currentReport.processes);

            // Extract headers from the first object in the report
            if (currentReport.processes.length > 0) {
                setHeaders(Object.keys(currentReport.processes[0]));
            }
        } else {
            setReport([]);
            setHeaders([]);
        }
    }, [processList, plugin]);  // Add plugin to the dependency array

    useEffect(() => {
        console.log("report:");
        console.log(report);
    }, [report]);

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
        <div className="p-4">
            <h1>Current Plugin: {plugin}</h1>
            <table className="min-w-full text-themeText-light">
                <thead className="bg-themeBlue-default text-white">
                    <tr>
                        {headers.map((header) => (
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
        </div>
    );
};
