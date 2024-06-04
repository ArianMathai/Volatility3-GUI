import React, { useEffect, useState } from "react";

const PluginList = ({ selectedOS }) => {
    const [allPlugins, setAllPlugins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchAllPlugins = async () => {
        setIsLoading(true);
        try {
            const data = await window.electronAPI.fetchAllPlugins();
            setAllPlugins(data);
        } catch (error) {
            console.error("Error fetching plugins:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPlugins();
    }, []);

    const filteredPlugins = allPlugins.filter(
        (plugin) =>
            plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            plugin.platform.toLowerCase() === selectedOS.toLowerCase()
    );

    const renderTableHeaders = () => {
        if (filteredPlugins.length === 0) return null;
        return (
            <thead>
            <tr>
                <th className="px-4 py-2 text-white">Name</th>
                <th className="px-4 py-2 text-white">Description</th>
                <th className="px-4 py-2 text-white">Link</th>
                <th className="px-4 py-2 text-white">Category</th>
            </tr>
            </thead>
        );
    };

    const renderTableRows = () => {
        return (
            <tbody>
            {filteredPlugins.map((plugin, index) => (
                <tr
                    key={index}
                    className={`p-2 ${index % 2 === 0 ? "bg-darkerblue-important" : "bg-darkblue-important"}`}
                >
                    <td className="p-3 text-white">{plugin.name}</td>
                    <td className="p-3 text-white relative group">
                        <span>{plugin.description}</span>
                        <span className="ml-2 cursor-pointer relative">
                                More...
                                <span className="absolute hidden group-hover:block bg-black text-white text-sm rounded p-2 w-64 -top-10 left-1/2 transform -translate-x-1/2">
                                    {plugin.description2}
                                </span>
                            </span>
                    </td>
                    <td className="px-4 py-2">
                        <a
                            href={plugin.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            Link
                        </a>
                    </td>
                    <td className="px-4 py-2 text-white">{plugin.category}</td>
                </tr>
            ))}
            </tbody>
        );
    };

    return (
        <div className="w-3/4 mx-auto">
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
                <div className="overflow-y-auto max-h-96">
                    <table className="min-w-full border-collapse">
                        {renderTableHeaders()}
                        {renderTableRows()}
                    </table>
                </div>
            )}
        </div>
    );
};

export default PluginList;