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

    return (
        <div className="mt-4">
            <div className="mb-4">
                <select className="rounded shadow ms-3" value={dropdownValue} onChange={(e) => setDropdownValue(e.target.value)}>
                    <option value="" disabled>Select plugin</option>
                    <option value="Plugin 1">Plugin 1</option>
                    <option value="Plugin 2">Plugin 2</option>
                    <option value="Plugin 3">Plugin 3</option>
                </select>
                <button className="rounded shadow ms-3 ps-3 pe-3 bg-themeYellow-default" onClick={handleAddTab}>Run</button>
            </div>
            {selectedProcess.map((item, index) => {
                if (item?.isActive) {
                    return headers.map((header) => (
                        <React.Fragment key={header}>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-themeText-light">
                                <div className="font-sm font-bold">
                                    {header}:
                                </div>
                                <div className="font-sm">
                                    {item.data[header]}
                                </div>
                            </div>
                        </React.Fragment>
                    ));
                }
                return null;
            })}
        </div>
    );
};

export default BladesReportComponent;
