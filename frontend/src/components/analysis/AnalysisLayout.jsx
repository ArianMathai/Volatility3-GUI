import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import '../../css/AnalysisLayout.css';

export const AnalysisLayout = () => {
    const { plugins, setPlugins, searchQuery } = useAppContext();
    const [navItems, setNavItems] = useState([]);
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const [prevPath, setPrevPath] = useState("");

    useEffect(() => {
        if (plugins) {
            setNavItems(plugins);
            console.log("hallo fra check")
        }
        console.log("navitems: ", navItems)
        console.log("selected plugins: ", plugins);
    }, [plugins]);


    useEffect(() => {
        setPrevPath(currentLocation.pathname);
    }, [currentLocation]);

    const handleRemovePlugin = (pluginToRemove) => {
        setPlugins((prevPlugins) => prevPlugins.filter(plugin => plugin !== pluginToRemove));
    };

    return (

        <div className="analysis-layout-container">
            <div className="tabs-container">
                <div className="flex space-x-2 bg-gray-200 p-2 rounded-t-md shadow-md">
                    {navItems.map((item, index) => {
                        const isActive = currentLocation.pathname.includes(item);
                        return (
                            <div key={index} className={`tab-item ${isActive ? 'active-tab' : 'inactive-tab'}`}>
                                <span onClick={() => navigate(`/analysis/${item}`)}>{item}</span>
                                {isActive && (
                                    <button className="close-button"
                                            onClick={() => handleRemovePlugin(item)}>X</button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
                <div>
                    <Outlet context={[searchQuery]}/>
                </div>
        </div>
    );
};