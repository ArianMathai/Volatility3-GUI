import React, { useEffect, useState } from "react";

const PluginList = () => {
    const [allPlugins, setAllPlugins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchAllPlugins = async () => {
        setIsLoading(true);
        try {
            const data = await window.electronAPI.fetchAllPlugins();
            setAllPlugins(data);
        } catch (error) {
            console.error('Error fetching plugins:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPlugins();
    }, []);

    useEffect(() => {
        console.log("All plugins = ", allPlugins);
    }, [allPlugins]);

    const filteredPlugins = allPlugins.filter(plugin =>
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search plugins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {filteredPlugins.map((plugin, index) => (
                        <li key={index} className="mb-4 p-4 border rounded shadow-sm">
                            <div>
                                <h3 className="text-xl font-bold">{plugin.name}</h3>
                                <p>{plugin.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PluginList;
