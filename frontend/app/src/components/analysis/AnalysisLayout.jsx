import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import '../../css/AnalysisLayout.css'; // Import custom CSS

export const AnalysisLayout = () => {
    const { plugins, setPlugins } = useAppContext();
    const { processList } = useAppContext();
    const [navItems, setNavItems] = useState([]);
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const [prevPath, setPrevPath] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (plugins) {
            setNavItems(plugins);
        }
    }, [plugins]);

    useEffect(() => {
        console.log("processList:");
        console.log(processList);
    }, [processList]);

    useEffect(() => {
        console.log("Current Path:", currentLocation.pathname);
        console.log("Previous Path:", prevPath);
        setPrevPath(currentLocation.pathname);
    }, [currentLocation]);

    const handleRemovePlugin = (pluginToRemove) => {
        setPlugins((prevPlugins) => prevPlugins.filter(plugin => plugin !== pluginToRemove));
    };

    return (
        <div className="analysis-layout-container">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search report..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>
            <div className="tabs-container">
                <div className="p-4">
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
                <div className="content-container">
                    <Outlet/>
                    <div className="p-4 bg-white shadow-md rounded-b-md">
                        <Outlet context={[searchQuery]}/>
                    </div>
                </div>
            </div>
        </div>
    );
};