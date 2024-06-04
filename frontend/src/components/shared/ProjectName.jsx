import {useAppContext} from "../../context/Context";

const ProjectName = () => {
    const {projectName} = useAppContext();

    return (
        <div className="mb-4">
            <strong className="text-themeText-light mb-2">Project name:</strong>
            <p className="bg-white-important text-themeGray-dark p-1 rounded shadow italic truncate">{projectName}</p>
        </div>
    )
}

export default ProjectName;