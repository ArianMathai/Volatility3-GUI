import React, { useState } from 'react';
import { useAppContext } from "../../context/Context";

const DynamicReport = ({ report }) => {
    const { selectedProcess, setSelectedProcess } = useAppContext(); // Added setPlugins for updating plugins array
    const [hoveredRow, setHoveredRow] = useState(null);

    if (!report || report.length === 0) return <div>No data available for this plugin.</div>;

    const headers = Object.keys(report[0]);

    const cellStyle = {
        textAlign: 'center',
        maxWidth: '120px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
    };

    const headerStyle = {
        textAlign: 'center',
    };

    // Function to handle row hover
    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    // Determine row background color based on hover state
    const getRowColor = (index) => {
        return index === hoveredRow ? 'rgba(125, 211, 252, 0.6)' : (index % 2 === 0 ? 'rgb(8, 47, 73)' : 'rgb(12, 74, 110)');
    };

    // Function to handle item selection
    const handleItemClick = (item) => {
        // Set isActive property of all items to false
        const updatedSelectedProcess = selectedProcess.map(process => ({
            ...process,
            isActive: false
        }));

        // Find the clicked item and set its isActive property to true
        const newItem = { isActive: true, data: item };
        const indexOfClickedItem = updatedSelectedProcess.findIndex(process => process.data.PID === item.PID);

        // If the clicked item exists, update its isActive property to true
        if (indexOfClickedItem !== -1) {
            updatedSelectedProcess[indexOfClickedItem] = newItem;
        } else {
            // If the clicked item doesn't exist, add it to the selectedProcess array
            updatedSelectedProcess.push(newItem);
        }

        setSelectedProcess(updatedSelectedProcess);
    };

    return (
        <table className="min-w-full text-themeText-light">
            <thead className="bg-themeBlue-default text-white">
                <tr>
                    {headers.map(header => (
                        <th key={header} className="font-bold" style={headerStyle}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {report.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}
                        style={{ backgroundColor: getRowColor(index) }}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={() => handleRowHover(null)}
                        onClick={() => handleItemClick(item)}>
                        {headers.map((header) => (
                            <td key={header} style={cellStyle}>
                                {item[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicReport;
