import React, { useEffect, useState } from "react";
import {useParams, useLocation, useOutletContext} from "react-router-dom";
import { useAppContext } from "../../context/Context";
import DynamicReport from "./DynamicReport";
import { BladesLayout } from "../blades/BladesLayout";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import BladesReportComponent from "../blades/BladesReportComponent";
import '../../css/AnalysisReportComponent.css'; // Import custom CSS for additional styling

export const AnalysisReportComponent = () => {
    const { processList, selectedProcess, setSelectedProcess } = useAppContext();
    const { plugin } = useParams();  // Get the last URL parameter
    const location = useLocation();  // Get the current location
    const [report, setReport] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchQuery] = useOutletContext() || [''];

    useEffect(()=>{
        console.log(searchQuery);
    },[searchQuery]);

    useEffect(() => {

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


    return (
        <div className="p-4">
            <div className="report-layout">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={25} order={1}>
                        <div className="dynamic-report-container">
                            <DynamicReport report={report } searchQuery={searchQuery}/>
                        </div>
                    </Panel>
                    {selectedProcess.length > 0 && <PanelResizeHandle />}
                    {selectedProcess.length > 0 && (
                        <Panel defaultSize={25} order={2}>
                            <div className="blades-layout-container">
                                <BladesLayout report={report} />
                            </div>
                        </Panel >
                    )}
                </PanelGroup>
            </div>
        </div>
    );
};
