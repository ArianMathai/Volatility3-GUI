import React from "react";

const UploadFile = () => {



    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input"></label>
            <input type="file" name="file_input" id="file_input" placeholder="upload image file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
            <input type="text" name="projectname" placeholder="Name your project..." className="bg-themeGray-default"/>
        </div>
    )
}

export default UploadFile;