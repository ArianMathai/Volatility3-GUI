import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/Context";

export const Analysis = () => {
    const {osName, systemInfo, file, pslist, setPslist} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("pslist:");
        console.log(pslist);
    }, [pslist]);

    return (
        <>
            <style>
                {`
                    .process-info-container {
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        gap: 10px;
                        margin-bottom: 10px;
                    }
                    .process-info-header, .process-info-item {
                        display: contents; /* Allows child elements to be direct children of the grid container */
                    }
                    .process-info-header div, .process-info-item div {
                        padding: 5px;
                        border: 1px solid #ccc;
                    }
                    .process-info-header div {
                        font-weight: bold;
                        background-color: #f0f0f0;
                    }
                `}
            </style>
            <div className="process-info-container">
                <div className="process-info-header">
                    <div>PID</div>
                    <div>PPID</div>
                    <div>ImageFileName</div>
                    <div>Handles</div>
                    <div>Threads</div>
                    <div>CreateTime</div>
                </div>
                {pslist.length > 1 && pslist.map((item, index) => (
                    <div className="process-info-item" key={index}>
                        <div>{item.PID}</div>
                        <div>{item.PPID}</div>
                        <div>{item.ImageFileName}</div>
                        <div>{item.Handles}</div>
                        <div>{item.Threads}</div>
                        <div>{item.CreateTime}</div>
                    </div>
                ))}
            </div>
        </>
    );
};
