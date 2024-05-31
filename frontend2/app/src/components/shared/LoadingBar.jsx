import React, { useEffect, useState } from "react";
import "../../css/styling.css"; // Import the CSS file

const LoadingBar = ({ currentValue, label, maxValue }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress((currentValue / maxValue) * 100);
    }, [currentValue, maxValue]);

    return (
        <div>
            <label htmlFor="progress-bar">{label}</label>
            <div className="progress-bar">
                <div
                    className="progress-bar-inner"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingBar;