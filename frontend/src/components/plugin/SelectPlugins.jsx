import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export const SelectPlugins = ({ setIsLoading }) => {
    const { osName, file, setProcessList, setPlugins, plugins, pluginList, setPluginList, setProcessError } = useAppContext();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [hoveredPlugin, setHoveredPlugin] = useState(null);
    const [pluginQuery, setPluginQuery] = useState("");
    const [filteredPlugins, setFilteredPlugins] = useState([]);

    const navigate = useNavigate();

    const fetchPlugins = async () => {
        setIsLoading(true);
        if (!osName) {
            setIsLoading(false);
            return;
        }

        try {
            const data = await window.electronAPI.fetchPlugins(osName);
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
    }, [osName]);

    useEffect(() => {
        console.log("Plugin List:", pluginList);
    }, [pluginList]);

    useEffect(() => {
        setButtonDisabled(plugins.length === 0);
    }, [plugins]);

    const fetchProcessLists = async () => {
        setIsLoading(true);
        if (!file || !plugins.length) return;

        const processList = [];
        for (const plugin of plugins) {
            try {
                const res = await window.electronAPI.fetchProcessList(file.path, osName, plugin);
                processList.push({ plugin, processes: res.processes });
            } catch (error) {
                const processErr = {"plugin": plugin, "error": `error running plugin ${plugin}`}
                setProcessError((prev) => [...prev, processErr]);
                console.error(`Error fetching process list for ${plugin}:`, error);
            }
        }
        setProcessList(processList);
        setIsLoading(false);
        navigate(`/analysis/${plugins[0]}`);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setPlugins(prevPlugins => {
            const updatedPlugins = checked ? [...prevPlugins, value] : prevPlugins.filter(plugin => plugin !== value);
            return updatedPlugins;
        });
    };

    useEffect(() => {

        setFilteredPlugins(pluginList.filter((plugin) => plugin.name.toLowerCase().includes(pluginQuery.toLowerCase())))

    }, [pluginQuery, pluginList]);


    return (
        <div className="flex flex-col m-auto p-5">
            <div className="w-1/3 ms-auto mb-3 relative">
                <img src="../public/img/search-icon.png" className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" alt="search icon"/>
                <input
                    type="text"
                    placeholder="Search plugins..."
                    value={pluginQuery}
                    onChange={(e) => setPluginQuery(e.target.value)}
                    className="p-1 pl-8 border rounded w-full"
                />
            </div>
            <div className="rounded shadow bg-themeBlue-darker max-h-80 min-h-80 overflow-y-auto">
                {filteredPlugins.length > 0 && (
                    <div
                        className="p-5 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-32 relative">
                        {filteredPlugins.map((plugin, index) => (
                            <div className="p-1 relative flex items-center" key={index}>
                                <input
                                    type="checkbox"
                                    value={plugin.name}
                                    id={`plugin${index}-checkbox`}
                                    onChange={handleCheckboxChange}
                                    checked={plugins.includes(plugin.name)}
                                    className="align-middle me-2"
                                />
                                <label
                                    htmlFor={`plugin${index}-checkbox`}
                                    className="text-themeText-light hover:underline whitespace-nowrap"
                                    onMouseEnter={(e) => setHoveredPlugin(plugin)}
                                    onMouseLeave={() => setHoveredPlugin(null)}
                                >
                                    {plugin.name}
                                </label>
                                {hoveredPlugin === plugin && (
                                    <div
                                        className="bg-white-important absolute p-2 rounded w-50 shadow-lg z-20 max-w-xs break-words"
                                        style={{ top: '100%', left: '0'}}
                                    >
                                        <p>{plugin.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-end mt-5">
                <button
                    className="btn p-2 w-32 rounded shadow bg-themeYellow-default hover:bg-themeYellow-light"
                    disabled={buttonDisabled}
                    onClick={fetchProcessLists}
                >
                    Run
                </button>
            </div>
        </div>
    );
};