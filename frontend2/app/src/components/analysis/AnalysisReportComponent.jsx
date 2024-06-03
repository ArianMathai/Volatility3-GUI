import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import DynamicReport from "./DynamicReport";

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

    return (
        <div className="p-4">
            <DynamicReport report={report} /> {/* Use the new DynamicReport component */}
        </div>
    );
};
