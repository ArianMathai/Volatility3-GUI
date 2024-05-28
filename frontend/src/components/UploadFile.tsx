import React, { useState } from "react";

const UploadFile: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload");
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
            // handle success
        } catch (error) {
            console.error("Error uploading file:", error);
            // handle error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/5 m-auto gap-3">
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
            <button type="submit" className="bg-themeGray-dark uppercase rounded p-3">
                Next
            </button>
        </form>
    );
};

export default UploadFile;
