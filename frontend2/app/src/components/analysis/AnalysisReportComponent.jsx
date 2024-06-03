import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

export const AnalysisReportComponent = () => {
    const { processList } = useAppContext();
    const navigate = useNavigate();
    const { plugin } = useParams();  // Get the last URL parameter
    const location = useLocation();  // Get the current location
    const [report, setReport] = useState([]);

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
        } else {
            setReport([]);
        }
    }, [processList, plugin]);  // Add plugin to the dependency array

    useEffect(() => {
        console.log("report:");
        console.log(report);
    }, [report]);

    return (
        <div className="p-4">
            <table className="min-w-full text-themeText-light">
                <thead className="bg-themeBlue-default text-white">
                    <tr>
                        <th className="font-bold">PID</th>
                        <th className="font-bold">PPID</th>
                        <th className="font-bold">ImageFileName</th>
                        <th className="font-bold">Handles</th>
                        <th className="font-bold">Threads</th>
                        <th className="font-bold">CreateTime</th>
                    </tr>
                </thead>
                <tbody>
                    {report.length > 0 ? (
                        report.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}>
                                <td>{item.PID}</td>
                                <td>{item.PPID}</td>
                                <td>{item.ImageFileName}</td>
                                <td>{item.Handles}</td>
                                <td>{item.Threads}</td>
                                <td>{item.CreateTime}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No data available for this plugin.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
