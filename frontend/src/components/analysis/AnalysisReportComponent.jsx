import React, { useEffect, useState } from "react";
import {useParams, useLocation, useOutletContext} from "react-router-dom";
import { useAppContext } from "../../context/Context";
import DynamicReport from "./DynamicReport";
import { BladesLayout } from "../blades/BladesLayout";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

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

            if (currentReport.processes.length > 0) {
                setHeaders(Object.keys(currentReport.processes[0]));
            }
        } else {
            setReport([]);
            setHeaders([]);
        }
    }, [processList, plugin]);


    return (
        <div className="p-4">
            <div>
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={25} order={1}>
                        <divs>
                            <DynamicReport report={report } searchQuery={searchQuery}/>
                        </divs>
                    </Panel>
                    {selectedProcess.length > 0 && <PanelResizeHandle />}
                    {selectedProcess.length > 0 && (
                        <Panel defaultSize={25} order={2}>
                            <div>
                                <BladesLayout report={report} />
                            </div>
                        </Panel >
                    )}
                </PanelGroup>
            </div>
        </div>
    );
};
