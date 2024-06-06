import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";

export const AnalysisLayout = () => {
    const { plugins, setPlugins, searchQuery, processList, setProcessList, setProcessError } = useAppContext();
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

        setProcessError((prevErrors) => prevErrors.filter((err) => err.plugin !== pluginToRemove));

        setPlugins((prevPlugins) => prevPlugins.filter(plugin => plugin !== pluginToRemove));
        processList?.map((item, index) => {
            if (item.plugin === pluginToRemove) {

                if (processList.length === 1) {
                    navigate(`/analysis/${processList[0].plugin}`)
                } else {
                    if (index === 0){
                        navigate(`/analysis/${processList[index + 1].plugin}`)
                    }else {
                        navigate(`/analysis/${processList[index - 1].plugin}`)
                    }
                }
            }
        })
        setProcessList((prevList, index) => prevList.filter(item => item.plugin !== pluginToRemove));


    };

    return (

        <div>
            <div>
                <div className="flex ms-3">
                    {navItems.map((item, index) => {

                        const isActive = currentLocation.pathname.includes(item);
                        return (
                            <div key={index} className={`tab-item ${isActive ? 'bg-themeBlue-darkest' : 'bg-themeBlue-dark'} text-themeText-light shadow rounded-t-md p-2 hover:cursor-pointer`}>
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