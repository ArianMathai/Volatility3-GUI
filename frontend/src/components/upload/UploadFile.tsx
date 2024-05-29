import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const UploadFile: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [projectName, setProjectName] = useState("");
    const [osName, setOsName] = useState<string>();
    const [systemInfo, setSystemInfo] = useState();
    const [isInfoLoaded, setIsInfoLoaded] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        const validProjectName = /^[a-zA-Z0-9_]*$/;
        if (validProjectName.test(userInput)) {
            setProjectName(userInput);
        } else {
            setProjectName("")
        }
    };
    async function fetchOsConfig() {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/detectos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'filepath': file?.path
                })
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: Record<string, any>[] = await res.json();
            const osInfo = data.find(item => item.os);
            const processesInfo = data.find(item => item.processes);

            // Disse funker nå
            if (osInfo) {
                setOsName(osInfo.os);
            }
            if (processesInfo) {
                setSystemInfo(processesInfo.processes);
            }


        } catch (error) {
            console.error("There was a problem fetching the OS config:", error);
        }
    }

    useEffect(() => {
        if (file){
            fetchOsConfig();
        }
    }, [file]);

    useEffect(() => {
        if (osName && systemInfo){
            setIsInfoLoaded(true);
        }
        console.log("osname = ", osName)
        console.log("Sysinfo = ", systemInfo)
    }, [systemInfo, osName]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append("filepath", file);

        await fetchOsConfig()
    };

    const isFormValid = file && projectName && isInfoLoaded;
    const isProjectNameValid = projectName !== "";
    const colorOfBtnClass = isFormValid && isProjectNameValid ? 'bg-themeYellow-default' : 'bg-themeGray-dark';

    const navigate = useNavigate();
    const goNext = () => {
        navigate("/analysis");
    };



    return (
        <form onSubmit={handleSubmit} className="m-auto">
            <div className="max-w-lg mx-auto flex flex-col gap-3">
            <label className="text-themeText-light" htmlFor="file_input">
                Supported formats: dmp, vmem, txt
            </label>
            <input
                type="file"
                name="file_input"
                id="file_input"
                className="cursor-pointer text-themeText-light border rounded p-3"
                accept=".dmp,.vmem,.txt"
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

export default UploadFile;
