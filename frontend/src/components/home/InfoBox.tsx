import React from "react";

const InfoBox = () => {
    return (
        <div className="bg-themeBlue-dark rounded-2xl shadow-2xl ">
            <ul className="p-10">
                <h3 className="p-3 text-xl text-themeText-light">To get started: </h3>

                <li className="text-themeText-light font-bold p-1">
                    1. Create new project
                </li>
                <li className="text-themeText-light p-1">2. Select image file</li>
                <li className="text-themeText-light p-1">3. Choose plugins</li>
                <li className="text-themeText-light p-1">4. Run and analyze result</li>
            </ul>
        </div>
    );
};

export default InfoBox;
