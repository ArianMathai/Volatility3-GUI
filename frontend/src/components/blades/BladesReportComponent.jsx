import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/Context";

const BladesReportComponent = () => {
    const { selectedProcess } = useAppContext();
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const activeItem = selectedProcess?.find(item => item?.isActive);
        if (activeItem) {
            setHeaders(Object.keys(activeItem?.data));
        }
    }, [selectedProcess]);

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
    );
};

export default BladesReportComponent;
