import {useAppContext} from "../../context/Context";
import {useState} from "react";

const ExportButton = ({report, plugin, messagePosition}) => {

    const {folderPath} = useAppContext();
    const [message, setMessage] = useState("");

    const exportToCSV = async () => {

        const csvRows = [];

        //Adding the headers for the csv file
        //Taking first object and extracting all keys
        const headers = Object.keys(report[0]);

        //Creates a string like this 'PID,PPID,...'
        csvRows.push(headers.join(','));

        report.forEach(item => {
            const values = headers.map(header => item[header]);
            csvRows.push(values.join(','));
        })

        const csvContent = csvRows.join('\n');


        const res= await window.fileAPI.saveCSV(folderPath,csvContent,plugin);

        if(res.status){
            setMessage(res.message);
            setTimeout(() => {
                setMessage("");
            },3500);
        } else {
            setMessage(res.message);
        }


    }

    return (
        <div className={"relative flex items-center flex-wrap max-w-full"}>
            {messagePosition === 'left' && message && (
                <div className="ml-3 text-themeText-light me-3">
                    {message}
                </div>
            )}
            <button
                className="rounded ml-3 whitespace-nowrap shadow p-1 px-3 bg-themeYellow-default hover:bg-themeYellow-light"
                onClick={exportToCSV}
            >
                Export {plugin}.csv
            </button>
            {messagePosition === 'right' && message && (
                <div className="ml-3 text-themeText-light me-3">
                    {message}
                </div>
            )}
        </div>
    );

}

export default ExportButton;