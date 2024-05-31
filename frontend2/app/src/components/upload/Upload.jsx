import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/Context";

export const Upload = () => {

    const [projectName, setProjectName] = useState("");

    const { setOsName, setSystemInfo, file, setFile } = useAppContext();
    const navigate = useNavigate();

    const fetchSystemInfo = async (e) => {
        e.preventDefault();
        if (!file) return;
        console.log("filepath ", file.path)
        try {
            const res = await window.electronAPI.fetchSystemInfo(file.path);
            console.log(res)
            setOsName(res[0]);
            setSystemInfo(res[1]);
            console.log("navigate next")

        } catch (error) {
            console.error('Error fetching system info:', error);
        }
        navigate("/selectplugins");
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleProjectNameChange = (e) => {
        const userInput = e.target.value;
        const validProjectName = /^[a-zA-Z0-9_]*$/;
        if (validProjectName.test(userInput)) {
            setProjectName(userInput);
        } else {
            setProjectName("")
        }
    };

    const isFormValid = file && projectName;
    const isProjectNameValid = projectName !== "";
    const colorOfBtnClass = isFormValid && isProjectNameValid ? 'bg-themeYellow-default' : 'bg-themeGray-dark';

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

