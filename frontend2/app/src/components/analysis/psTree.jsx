import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/Context";

export const PsTree = () => {
    const { processList } = useAppContext();
    const navigate = useNavigate();
    const [report, setReport] = useState([]);

    useEffect(() => {
        console.log("processList:");
        console.log(processList);
        processList.forEach((element) => {
            if (element.plugin === "pstree") {
                setReport(element.processes)
            }
        })
    }, [processList]);

    useEffect(() => {
        console.log("report:");
        console.log(report);

    }, [report]);

    return (
        <div className="p-4">
            <table className="min-w-full text-themeText-light">
                <thead className="bg-themeBlue-default text-white">
                <tr>
                    <th className="font-bold">PID</th>
                    <th className="font-bold">PPID</th>
                    <th className="font-bold">ImageFileName</th>
                    <th className="font-bold">Handles</th>
                    <th className="font-bold">Threads</th>
                    <th className="font-bold">CreateTime</th>
                </tr>
                </thead>
                <tbody>
                {report.length > 1 && report.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-themeBlue-dark text-white' : 'bg-white text-black'}>
                        <td>{item.PID}</td>
                        <td>{item.PPID}</td>
                        <td>{item.ImageFileName}</td>
                        <td>{item.Handles}</td>
                        <td>{item.Threads}</td>
                        <td>{item.CreateTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};