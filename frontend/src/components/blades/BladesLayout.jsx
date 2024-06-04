import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import BladesReportComponent from "./BladesReportComponent";

export const BladesLayout = () => {
    const [navItems, setNavItems] = useState([]);
    const {  selectedProcess} = useAppContext();
    const currentLocation = useLocation();
    const [prevPath, setPrevPath] = useState("");

    useEffect(() => {
        if (selectedProcess) {
            const updatedNavItems = selectedProcess.map(process => ({
                data: process.data.ImageFileName,
                isActive: process.isActive
            }));
            setNavItems(updatedNavItems);
        }
    }, [selectedProcess]);

    useEffect(() => {
        setPrevPath(currentLocation.pathname);
    }, [currentLocation]);

    return (
        <div>
            <div>
                {navItems.map((item, index) => {
                    if (item?.isActive) {
                        return (
                            <div key={index} className="bg-themeBlue-dark text-themeText-light max-w-[100px]">
                                <span>{item.data}</span>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="content-container">
                <BladesReportComponent />
            </div>
        </div>
    );
};
