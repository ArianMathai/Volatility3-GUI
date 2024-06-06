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
    const [showBlade, setShowBlade] = useState(false);

    useEffect(()=>{
        console.log(searchQuery);
    },[searchQuery]);

    useEffect(()=>{

        if ( selectedProcess.length > 0 && selectedProcess.find(item => item.isActive)) {
            setShowBlade(true);
        } else if(selectedProcess.length > 0 && selectedProcess.tabs && selectedProcess.tabs.find(item => item.isActive)) {
            setShowBlade(true)
        } else {
            setShowBlade(false)
        }


        // selectedProcess.map(item => {
        //     if (item.isActive) {
        //         setShowBlade(true);
        //
        //     } else {
        //         item.map(tab => {
        //             if (tab.isActive) {
        //             setShowBlade(true);
        //         }
        //         })
        //     }
        // })
        console.log(showBlade);
    },[selectedProcess]);

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
                        <div className="m-3 mt-0">
                            <DynamicReport report={report} searchQuery={searchQuery}/>
                        </div>
                    </Panel>
                    {selectedProcess.length > 0 && <PanelResizeHandle />}
                    {selectedProcess.length > 0 && showBlade &&
                        <Panel defaultSize={25} order={2} className="border-l-2 border-themeBlue-darkest bg-themeBlue-darker" >
                                <BladesLayout report={report}  />
                        </Panel >
                    }
                </PanelGroup>
        </div>
    );
};
