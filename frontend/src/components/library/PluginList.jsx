import React, { useEffect, useState, useRef } from "react";

const PluginList = ({ selectedOS }) => {
    const [allPlugins, setAllPlugins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [expandedRow, setExpandedRow] = useState(null);
    const tableContainerRef = useRef(null);

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

    const sortedPlugins = React.useMemo(() => {
        let sortablePlugins = [...filteredPlugins];
        if (sortConfig.key !== null) {
            sortablePlugins.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortablePlugins;
    }, [filteredPlugins, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop = 0;
        }
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '../public/img/sortDown.png' : '../public/img/sortUp.png';
        }
        return '../public/img/sortDown.png'; // Default icon
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Processes':
                return '#EB4ABE';
            case 'System Activity':
                return '#F6E020';
            case 'System Info':
                return '#C154F5';
            case 'Malware':
                return '#F2001D';
            case 'Network':
                return '#24E5FF';
            case 'Credentials':
                return '#8FD14C';
            default:
                return '#FFFFFF'; // Default color
        }
    };

    const renderTableHeaders = () => {
        if (filteredPlugins.length === 0) return null;
        return (
            <thead className="sticky top-0 bg-darkblue-important z-10 rounded-xl">
            <tr>
                <th className="px-4 py-2 text-white cursor-pointer rounded-l-lg" onClick={() => requestSort('name')}>
                    <div className="flex items-center px-4 py-2">
                        Name
                        <img className="inline-block w-4 ml-2" src={getSortIcon('name')} alt="sortingIcon" />
                    </div>
                </th>
                <th className="px-4 py-2 text-white">Description</th>
                <th className="px-4 py-2 text-white">Link</th>
                <th className="px-4 py-2 text-white cursor-pointer rounded-r-lg" onClick={() => requestSort('category')}>
                    <div className="flex items-center px-4 py-2">
                        Category
                        <img className="inline-block w-4 ml-2" src={getSortIcon('category')} alt="sortingIcon" />
                    </div>
                </th>
            </tr>
            </thead>
        );
    };

    const renderTableRows = () => {
        return (
            <tbody>
            {sortedPlugins.map((plugin, index) => (
                <tr
                    key={index}
                    className={`p-2 ${index % 2 === 0 ? "bg-darkerblue-important" : "bg-darkblue-important"} rounded-lg`}
                >
                    <td className="p-3 text-white rounded-l-lg">{plugin.name}</td>
                    <td className="p-3 text-white text-sm relative" style={{ fontStyle: 'italic', fontWeight: "lighter" }}>
                        <div className="flex justify-between items-center">
                            <span>{expandedRow === index ? plugin.description2 : plugin.description}</span>
                            <button
                                className="inline-block bg-gray-700 text-white p-1 rounded-md ml-2 relative"
                                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                            >
                                {expandedRow === index ? "Less" : "More..."}
                            </button>
                        </div>
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
                    <td className="px-4 py-2 text-white rounded-r-lg" style={{ color: getCategoryColor(plugin.category) }}>
                        #{plugin.category}
                    </td>
                </tr>
            ))}
            </tbody>
        );
    };

    return (
        <div className="w-3/4 mx-auto flex flex-col h-full">
            <div className="p-3 w-1/2 mx-auto">
                <input
                    type="text"
                    placeholder="Search plugins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-3 border rounded-xl w-full"
                />
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-y-auto flex-grow" ref={tableContainerRef}>
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