import React, { useState } from "react";
import {useNavigate} from "react-router-dom";




export const Upload = () => {

    const [file, setFile] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [osName, setOsName] = useState("");
    const [systemInfo, setSystemInfo] = useState([]);

    const fetchSystemInfo = async (e) => {
        e.preventDefault();
        if (!file) return;
        console.log("filepath ", file.path)
        try {
            const res = await window.electronAPI.send("fetch-system-info", file.path);
            console.log("res", res);
            // Process the response and update state as needed
        } catch (error) {
            console.error('Error fetching system info:', error);
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);


        try {
            const response = await fetch("your-backend-endpoint", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }


    };

    const isFormValid = file && projectName;
    const isProjectNameValid = projectName !== "";
    const colorOfBtnClass = isFormValid && isProjectNameValid ? 'bg-themeYellow-default' : 'bg-themeGray-dark';

    const navigate = useNavigate();

    const goNext = () => {
        console.log("name" + projectName)
        //navigate("/analysis");
    };



    return (
        <form onSubmit={fetchSystemInfo} className="m-auto">
            <div className="max-w-lg mx-auto flex flex-col gap-3">
                <label className="text-themeText-light" htmlFor="file_input">
                    Supported formats: dmp, vmem, mem, txt
                </label>
                <input
                    type="file"
                    name="file_input"
                    id="file_input"
                    className="cursor-pointer text-themeText-light border rounded p-3"
                    accept=".dmp, .vmem, .mem, .txt"
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
                <button type="submit" disabled={!isFormValid} onClick={goNext}  className={`${colorOfBtnClass} uppercase rounded p-3`}>
                    Next
                </button>
            </div>
        </form>
    );
};

