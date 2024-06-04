import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import '../../css/AnalysisLayout.css';
import BladesReportComponent from "./BladesReportComponent";

export const BladesLayout = () => {
    const [navItems, setNavItems] = useState([]);
    const { plugins, setPlugins, selectedProcess, setSelectedProcess } = useAppContext();
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const [prevPath, setPrevPath] = useState("");

    useEffect(() => {
        if (selectedProcess) {
            const updatedNavItems = selectedProcess.map(process => ({
                ...process,
                data: process.data.ImageFileName,
                isActive: process.isActive,
            }));
            setNavItems(updatedNavItems);
        }
    }, [selectedProcess]);

    useEffect(() => {
        console.log("selected process:", selectedProcess);
        console.log("selected navItems:", navItems);
    }, [selectedProcess, navItems]);

    useEffect(() => {
        // console.log("Current Path:", currentLocation.pathname);
        // console.log("Previous Path:", prevPath);
        setPrevPath(currentLocation.pathname);
    }, [currentLocation]);

    return (
        <div className="blades-layout-container">
            {navItems.map((item, index) => {
                if (item?.isActive) {
                    return (
                        <div className="tabs-container">
                            <div key={index} className={`tab-item ${item.isActive ? 'active-tab' : 'inactive-tab'}`}>
                                <span>{item.data}</span>
                            </div>
                            {item?.tabs?.length > 0 && item?.tabs?.map((item) => {
                            return (
                                <div key={index}
                                     className={`tab-item ${item?.isActive ? 'active-tab' : 'inactive-tab'}`}>
                                    <span>{item?.plugin}</span>
                                </div>
                            )})}
                        </div>
                    )
                }})
            }

            <div className="content-container">
                <BladesReportComponent />
            </div>
        </div>
    );
};
