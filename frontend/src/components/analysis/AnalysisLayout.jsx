import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

export const AnalysisLayout = () => {
    const { plugins, setPlugins, searchQuery, processList, setProcessList } = useAppContext();
    const [navItems, setNavItems] = useState([]);
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const [prevPath, setPrevPath] = useState("");

    useEffect(() => {
        if (plugins) {
            setNavItems(plugins);
        }
        // console.log("navitems: ", navItems)
        // console.log("selected plugins: ", plugins);
        console.log("process list: ", processList);
    }, [plugins]);


    useEffect(() => {
        setPrevPath(currentLocation.pathname);
    }, [currentLocation]);

    const handleRemovePlugin = (pluginToRemove) => {
        setPlugins((prevPlugins) => prevPlugins.filter(plugin => plugin !== pluginToRemove));
        processList?.map((item, index) => {
            if (item.plugin === pluginToRemove) {

                if (processList.length === 1) {
                    navigate(`/analysis/${processList[0].plugin}`)
                } else {
                    navigate(`/analysis/${processList[index - 1].plugin}`)
                }
            }
        })
        setProcessList((prevList, index) => prevList.filter(item => item.plugin !== pluginToRemove));


    };

    return (

        <div>
            <div>
                <div className="flex">
                    {navItems?.map((item, index) => {
                        const isActive = currentLocation.pathname.includes(item);
                        return (
                            <div key={index} className={`tab-item ${isActive ? 'bg-themeBlue-dark' : 'bg-themeBlue-darkest'} text-themeText-light shadow rounded-t-md p-2 hover:cursor-pointer`}>
                                <span onClick={() => navigate(`/analysis/${item}`)}>{item}</span>
                                <button className="text-red-800 ms-3" onClick={() => handleRemovePlugin(item)}>x</button>
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