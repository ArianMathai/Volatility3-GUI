import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import BladesReportComponent from "./BladesReportComponent";

export const BladesLayout = () => {
    const [navItems, setNavItems] = useState([]);
    const { selectedProcess } = useAppContext();
    const currentLocation = useLocation();
    const [prevPath, setPrevPath] = useState("");

    useEffect(() => {
        if (selectedProcess) {
            const updatedNavItems = selectedProcess.map((process) => ({
                ...process,
                data: process.data.ImageFileName,
                isActive: process.isActive,
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
                            <div key={index} className="bg-themeBlue-darkest text-themeText-light shadow rounded-tr-md p-2 hover:cursor-pointer flex items-center">
                                <span className="flex-grow">{item.data}</span>
                                <button className="text-red-800 ms-3 flex-shrink-0">x</button>
                                {item?.tabs?.length > 0 &&
                                    item.tabs.map((tab, tabIndex) => (
                                        <div key={tabIndex} className="text-red-800 ms-3 flex-shrink-0">
                                            <span>{tab?.plugin}</span>
                                        </div>
                                    ))}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            <div>
                <BladesReportComponent />
            </div>
        </div>
    );
};
