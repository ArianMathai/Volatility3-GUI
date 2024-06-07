import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import BladesReportComponent from "./BladesReportComponent";

export const BladesLayout = () => {
    const [navItems, setNavItems] = useState([]);
    const { selectedProcess, setSelectedProcess } = useAppContext();
    const currentLocation = useLocation();

    useEffect(() => {
        if (selectedProcess) {
            const updatedNavItems = selectedProcess.map((process) => ({
                ...process,
                data: process.data.ImageFileName,
                isActive: process.isActive || false,
                tabs: process.tabs ? process.tabs.map((tab) => ({
                    ...tab,
                    isActive: tab.isActive || false
                })) : []
            }));
            setNavItems(updatedNavItems);
        }
    }, [selectedProcess]);

    const handleNavItemClick = (index) => {
        const updatedNavItems = navItems.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    isActive: true,
                    tabs: item.tabs.map((tab) => ({
                        ...tab,
                        isActive: false
                    }))
                };
            } else {
                return {
                    ...item,
                    isActive: false,
                    tabs: item.tabs.map((tab) => ({
                        ...tab,
                        isActive: false
                    }))
                };
            }
        });
        setNavItems(updatedNavItems);

        const updatedSelectedProcess = selectedProcess.map((item, idx) => {
            return idx === index ? { ...item, isActive: true, tabs: item.tabs.map(tab => ({ ...tab, isActive: false })) } : { ...item, isActive: false };
        });
        setSelectedProcess(updatedSelectedProcess);
    };

    const handleTabClick = (processIndex, tabIndex) => {
        const updatedNavItems = navItems.map((item, idx) => {
            if (idx === processIndex) {
                return {
                    ...item,
                    isActive: true,
                    tabs: item.tabs.map((tab, tIdx) => ({
                        ...tab,
                        isActive: tIdx === tabIndex
                    }))
                };
            } else {
                return {
                    ...item,
                    isActive: false,
                    tabs: item.tabs.map((tab) => ({
                        ...tab,
                        isActive: false
                    }))
                };
            }
        });
        setNavItems(updatedNavItems);

        const updatedSelectedProcess = selectedProcess.map((item, idx) => {
            if (idx === processIndex) {
                return {
                    ...item,
                    tabs: item.tabs.map((tab, tIdx) => ({
                        ...tab,
                        isActive: tIdx === tabIndex
                    }))
                };
            } else {
                return item;
            }
        });
        setSelectedProcess(updatedSelectedProcess);
    };

    const handleRemoveTab = (processIndex, tabIndex) => {
        const updatedNavItems = navItems.map((item, idx) => {
            if (idx === processIndex) {
                const updatedTabs = item.tabs.filter((_, tIdx) => tIdx !== tabIndex);
                return {
                    ...item,
                    tabs: updatedTabs
                };
            } else {
                return item;
            }
        });
        setNavItems(updatedNavItems);

        const updatedSelectedProcess = selectedProcess.map((item, idx) => {
            if (idx === processIndex) {
                const updatedTabs = item.tabs.filter((_, tIdx) => tIdx !== tabIndex);
                return {
                    ...item,
                    tabs: updatedTabs
                };
            } else {
                return item;
            }
        });
        setSelectedProcess(updatedSelectedProcess);
    };

    const handleRemoveMainTab = (processIndex) => {
        const updatedNavItems = navItems.filter((_, idx) => idx !== processIndex);
        setNavItems(updatedNavItems);

        const updatedSelectedProcess = selectedProcess.filter((_, idx) => idx !== processIndex);
        setSelectedProcess(updatedSelectedProcess);
    };

    const activeItem = navItems.find(item => item.isActive);

    return (
        <div>
            {activeItem && (
                <div className="flex items-center m-0">
                    <div
                        className={`p-2 shadow rounded-t-md whitespace-nowrap hover:cursor-pointer ${
                            activeItem.isActive
                                ? activeItem.tabs.some(tab => tab.isActive) ? "bg-themeBlue-dark text-themeText-light"
                                    : "bg-themeBlue-darkest text-themeText-light"
                                : "bg-themeBlue-dark text-themeText-light"
                        }`}
                        onClick={() => handleNavItemClick(navItems.indexOf(activeItem))}
                    >
                        <span>{activeItem?.data}</span>
                        <button
                            className="text-red-800 ms-3 flex-shrink-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMainTab(navItems.indexOf(activeItem));
                            }}
                        >
                            x
                        </button>
                    </div>
                    {activeItem.tabs.map((tab, tabIndex) => (
                        <div
                            key={tabIndex}
                            className={`p-2 shadow rounded-t-md whitespace-nowrap hover:cursor-pointer ${
                                tab.isActive
                                    ? "bg-themeBlue-darkest text-themeText-light"
                                    : "bg-themeBlue-dark text-themeText-light"
                            }`}
                            onClick={() => handleTabClick(navItems.indexOf(activeItem), tabIndex)}
                        >
                            <span>{tab?.plugin}</span>
                            <button
                                className="text-red-800 ms-3 flex-shrink-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTab(navItems.indexOf(activeItem), tabIndex);
                                }}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <BladesReportComponent />
            </div>
        </div>
    );
};
