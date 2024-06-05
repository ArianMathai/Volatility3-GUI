import React, { useContext } from "react";
import { AppContext } from '../../context/Context';

const InfoBox = () => {
    const { step1Completed, step2Completed } = useContext(AppContext);

    return (
        <article className="bg-themeBlue-dark text-themeText-light rounded-2xl shadow-2xl p-5 ps-10 pe-10 h-full">
            <h3 className="text-xl font-bold">To get started: </h3>
            <ul className="p-1 mt-5 text-left">
                <li className={`${step1Completed ? 'line-through' : ''}`}>
                    1. Create new project
                </li>
                <li className={`${step2Completed ? 'line-through' : ''}`}>2. Select image file</li>
                <li>3. Choose plugins</li>
                <li>4. Run and analyze result</li>
            </ul>
        </article>
    );
};

export default InfoBox;