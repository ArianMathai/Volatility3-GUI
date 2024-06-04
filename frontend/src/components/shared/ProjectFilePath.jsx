import {useAppContext} from "../../context/Context";

const ProjectFilePath = () => {
    const {folderPath} = useAppContext();

    return (
        <div className="mb-12">
            <strong className="text-themeText-light mb-2">Project Path:</strong>
            <p className="bg-white-important text-themeGray-dark p-1 rounded shadow italic truncate">{folderPath}</p>
        </div>
    )
}

export default ProjectFilePath;