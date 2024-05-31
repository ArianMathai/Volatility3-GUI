import React from 'react';
import { useAppContext } from '../../context/Context'; // Ensure this path is correct

const ProcessList = () => {
    const { processList } = useAppContext(); // Get the process list from context

    return (
        <div>
            <h2>Process List</h2>
            {processList && processList.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>CreateTime</th>
                        <th>ExitTime</th>
                        <th>File</th>
                        <th>Handles</th>
                        <th>ImageFileName</th>
                        <th>Offset(V)</th>
                        <th>PID</th>
                        <th>PPID</th>
                        <th>SessionId</th>
                        <th>Threads</th>
                        <th>Wow64</th>
                        <th>output</th>
                    </tr>
                    </thead>
                    <tbody>
                    {processList.map((process, index) => (
                        <tr key={index}>
                            <td>{process.pid}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No process information available.</p>
            )}
        </div>
    );
};

export default ProcessList;