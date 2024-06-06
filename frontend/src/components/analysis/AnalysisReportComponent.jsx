import React, { useEffect, useState } from "react";
import {useParams, useLocation, useOutletContext} from "react-router-dom";
import { useAppContext } from "../../context/Context";
import DynamicReport from "./DynamicReport";
import { BladesLayout } from "../blades/BladesLayout";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const AnalysisReportComponent = () => {
    const { processList, selectedProcess, setSelectedProcess } = useAppContext();
    const { plugin } = useParams();
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
        <div className="mt-1">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={25} order={1}>
                        <div className="p-3">
                            <DynamicReport report={report} searchQuery={searchQuery}/>
                        </div>
                    </Panel>
                    {selectedProcess.length > 0 && <PanelResizeHandle />}
                    {selectedProcess.length > 0 && (
                        <Panel defaultSize={25} order={2} className="border-l-2 border-themeBlue-darkest bg-themeBlue-darker" >
                                <BladesLayout report={report}  />
                        </Panel >
                    )}
                </PanelGroup>
        </div>
    );
};
