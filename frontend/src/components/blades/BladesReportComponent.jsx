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

    return (
        <div className="text-themeText-light">
            {selectedProcess.map((item, index) => {
                if (item?.isActive) {
                    return headers.map((header) => (
                        <React.Fragment key={header}>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 ">
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
