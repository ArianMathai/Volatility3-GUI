import React from "react";
import {useAppContext} from "../../context/Context";

const ProjectInfo = () => {

    const {projectName, folderPath} = useAppContext();

    return (
        <>
            <div className="gap-3">
                <p className="text-themeText-light text-sm">
                    Project Name: <span className="italic">{projectName}</span>
                </p>
                <p className="text-themeText-light text-sm">
                    Working Directory: <span className="italic">{folderPath}</span>
                </p>
            </div>
        </>
    )
}

export default ProjectInfo;