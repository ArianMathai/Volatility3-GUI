import React from "react";
import {useAppContext} from "../../context/Context";

const ProjectInfo = () => {

    const {projectName, folderPath, file} = useAppContext();

    return (
        <>
            <div className="gap-3 text-sm  text-themeText-light">
                <p>
                    Project Name: <span className="italic">{projectName}</span>
                </p>
                <p>
                    Image file: <span className="italic">{file.path}</span>
                </p>
                <p>
                    Working Directory: <span className="italic">{folderPath}</span>
                </p>
            </div>
        </>
    )
}

export default ProjectInfo;