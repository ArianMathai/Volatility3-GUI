import React from "react";

const InfoBox = () => {
    return (
        <article className="bg-themeBlue-dark text-themeText-light rounded-2xl shadow-2xl p-5 ps-10 pe-10 h-full ">
            <h3 className="text-xl font-bold">To get started: </h3>
            <ul className="ms-2 mt-3 text-xl">
                <li className="font-bold">
                    1. Create new project
                </li>
                <li>2. Select image file</li>
                <li>3. Choose plugins</li>
                <li>4. Run and analyze result</li>
            </ul>
        </article>
    );
};

export default InfoBox;
