import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import DynamicReport from "./DynamicReport";
import { BladesLayout } from "../blades/BladesLayout";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const AnalysisReportComponent = () => {
    const { processList, selectedProcess } = useAppContext();
    const { plugin } = useParams();
    const [report, setReport] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchQuery] = useOutletContext() || [''];
    const [showBlade, setShowBlade] = useState(false);

    useEffect(() => {
        console.log(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (selectedProcess.length > 0 && selectedProcess.find(item => item.isActive)) {
            setShowBlade(true);
        } else if (selectedProcess.length > 0 && selectedProcess.some(item => item.tabs.some(tab => tab.isActive))) {
            setShowBlade(true);
        } else {
            setShowBlade(false);
        }
    }, [selectedProcess]);

    useEffect(() => {
        const currentReport = processList.find((element) => element.plugin === plugin);
        if (currentReport) {
            setReport(currentReport.processes);

            if (currentReport.processes.length > 0) {
                setHeaders(Object.keys(currentReport.processes[0]));
            }
        } else {
            setReport([]);
            setHeaders([]);
        }
    }, [processList, plugin]);

    return (
        <div className="mt-1">
            <PanelGroup direction="horizontal">
                <Panel defaultSize={75} order={1} style={{
                    minHeight: "70vh",
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    paddingBottom: 12,
                }}>
                    <DynamicReport report={report} searchQuery={searchQuery} />
                </Panel>
                {showBlade && <PanelResizeHandle />}
                {showBlade && (
                    <Panel defaultSize={25} order={2} style={{
                        minWidth: "2vh",
                        minHeight: "70vh",
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        paddingBottom: 12,
                    }}>
                        <BladesLayout report={report} />
                    </Panel>
                )}
            </PanelGroup>
        </div>
    );
};
