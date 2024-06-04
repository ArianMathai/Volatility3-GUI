import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/Context";

const BladesReportComponent = () => {
    const { selectedProcess, setSelectedProcess } = useAppContext();
    const [headers, setHeaders] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('');

    useEffect(() => {
        const activeItem = selectedProcess?.find(item => item?.isActive);
        if (activeItem) {
            setHeaders(Object.keys(activeItem?.data));
        }
    }, [selectedProcess]);

    const handleAddTab = () => {
        const activeItemIndex = selectedProcess.findIndex(item => item?.isActive);
        if (activeItemIndex !== -1) {
            const newTab = { plugin: dropdownValue, data: [] };
            const updatedProcess = [...selectedProcess];
            if (!updatedProcess[activeItemIndex].tabs) {
                updatedProcess[activeItemIndex].tabs = [];
            }
            const tabExists = updatedProcess[activeItemIndex].tabs.some(tab => tab.plugin === dropdownValue);
            if (!tabExists) {
                updatedProcess[activeItemIndex].tabs.push(newTab);
                setSelectedProcess(updatedProcess);
            }
        }
    };

    if (!selectedProcess || selectedProcess.length === 0) return <div>No data available for this plugin.</div>;

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '10px',
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
    };

    const headerStyle = {
        fontWeight: 'bold',
        textAlign: 'right',
        padding: '10px',
        fontSize: '20px',
    };

    const valueStyle = {
        textAlign: 'left',
        padding: '10px',
        fontSize: '18px',
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <select value={dropdownValue} onChange={(e) => setDropdownValue(e.target.value)}>
                    <option value="" disabled>Select plugin</option>
                    <option value="Plugin 1">Plugin 1</option>
                    <option value="Plugin 2">Plugin 2</option>
                    <option value="Plugin 3">Plugin 3</option>
                </select>
                <button onClick={handleAddTab}>Add Tab</button>
            </div>
            <div className="grid-container" style={gridContainerStyle}>
                {selectedProcess.map((item, index) => {
                    if (item?.isActive) {
                        return headers.map((header) => (
                            <React.Fragment key={header}>
                                <div className="header" style={headerStyle}>
                                    {header}:
                                </div>
                                <div className="value" style={valueStyle}>
                                    {item.data[header]}
                                </div>
                            </React.Fragment>
                        ));
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default BladesReportComponent;
