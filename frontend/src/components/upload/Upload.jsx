import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/Context";


export const Upload = ({setIsLoading, onFileUpload}) => {

    const { setOsName, setSystemInfo, file, setFile, projectName, setError,error, setProjectName,setFolderPath } = useAppContext();
    const navigate = useNavigate();

    const fetchSystemInfo = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!file){
            setIsLoading(false);
            return;
        }

        let res;

        try {
            res = await window.electronAPI.fetchSystemInfo(file.path);

            if (res.error) {
                setFile(null);
                setError(res.error);
            } else {
                setError("");
                setOsName(res.os);
                setSystemInfo(res.data.processes);
                await createProjectFolder();
                navigate("/selectplugins");
            }

        } catch (error) {
            setError(res.error);
        } finally {
            setIsLoading(false);
        }
    };


    const createProjectFolder = async () => {
        const result = await window.fileAPI.createProjectFolder(projectName);
        if (result.projectName !== projectName) {
            setProjectName(result.projectName);
        }
        setFolderPath(result.projectPath);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        onFileUpload(selectedFile); // Notify parent component about the file upload
    };

    const handleProjectNameChange = (e) => {
        const userInput = e.target.value;
        const validProjectName = /^[a-zA-Z0-9_]*$/;
        if (validProjectName.test(userInput)) {
            setProjectName(userInput);
        } else {
            setProjectName("");
        }
    };

    const isFormValid = file && projectName;
    const isProjectNameValid = projectName !== "";
    const colorOfBtnClass = isFormValid && isProjectNameValid ? 'bg-themeYellow-default hover:bg-themeYellow-light' : 'bg-themeGray-dark hover:none';

    return (
        <form onSubmit={fetchSystemInfo} className="m-auto">
            <div className="max-w-lg mx-auto flex flex-col gap-3">
                <label className="text-themeText-light" htmlFor="file_input">
                    Supported formats: dmp, vmem, mem, raw, txt
                </label>
                <input
                    type="file"
                    name="file_input"
                    id="file_input"
                    className="cursor-pointer text-themeText-light border rounded p-3"
                    accept=".dmp, .vmem, .mem, .raw, .txt"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="text"
                    name="projectname"
                    id="projectname"
                    className="rounded p-3"
                    onChange={handleProjectNameChange}
                    placeholder="Name your project..."
                />
                <button type="submit" disabled={!isFormValid} className={`${colorOfBtnClass} uppercase rounded p-3`}>
                    Next
                </button>
            </div>
        </form>
    );
};