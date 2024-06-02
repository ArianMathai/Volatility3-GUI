import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const SelectPlugins = ({ setIsLoading }) => {
    const { osName, file, setProcessList, setPlugins, plugins } = useAppContext();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [pluginList, setPluginList] = useState([]);
    const [hoveredPlugin, setHoveredPlugin] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        console.log("OS Name:", osName);
    }, [osName]);

    const fetchPlugins = async () => {
        setIsLoading(true);
        if (!osName) {
            setIsLoading(false);
            return;
        }

        try {
            const data = await window.electronAPI.fetchPlugins(osName.os);
            setPluginList(data);
        } catch (error) {
            console.error('Error fetching plugins:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!osName) return;
        fetchPlugins();
    }, []);

    useEffect(() => {
        console.log("Plugin List:", pluginList);
    }, [pluginList]);

    const fetchProcessLists = async () => {
        setIsLoading(true);
        if (!file || !plugins.length) return;

        const processList = [];
        for (const plugin of plugins) {
            try {
                const res = await window.electronAPI.fetchProcessList(file.path, osName.os, plugin);
                processList.push({ plugin, processes: res.processes });
            } catch (error) {
                console.error(`Error fetching process list for ${plugin}:`, error);
            }
        }
        setProcessList(processList);
        setIsLoading(false);
        navigate(`/analysis/${plugins[0]}`);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPlugins(prevPlugins => [...prevPlugins, value]);
            setButtonDisabled(false);
        } else {
            setPlugins(prevPlugins => prevPlugins.filter(plugin => plugin !== value));
            setButtonDisabled(plugins.length === 1);
        }
        console.log("Selected Plugins:", plugins);
    };

    return (
        <div className="flex flex-col m-auto p-5">
            {pluginList.length > 0 && (
                <div className="grid grid-cols-3 rounded shadow gap-4 bg-themeBlue-darker">
                    {pluginList.map((plugin, index) => (
                        <div className="p-2" key={index}>
                            <input
                                type="checkbox"
                                value={plugin.name}
                                id={`plugin${index}-checkbox`}
                                onChange={handleCheckboxChange}
                                className="align-middle me-2"
                            />
                            <label
                                htmlFor={`plugin${index}-checkbox`}
                                className="text-themeText-light hover:underline"
                                onMouseEnter={() => setHoveredPlugin(plugin)}
                                onMouseLeave={() => setHoveredPlugin(null)}
                            >
                                {plugin.name}
                            </label>
                            {hoveredPlugin === plugin && (
                                    <div className="bg-themeGray-default absolute p-2 rounded w-50 shadow-lg z-50 max-w-xs break-words">
                                        <p>{plugin.description}</p>
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-end mt-5">
                <button
                    className="btn p-2 rounded shadow bg-themeYellow-default hover:bg-themeYellow-light"
                    disabled={buttonDisabled}
                    onClick={fetchProcessLists}
                >
                    Run
                </button>
            </div>
        </div>
    );
};