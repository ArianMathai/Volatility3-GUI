import {useAppContext} from "../../context/Context";

const ExportButton = ({report, plugin}) => {

    const {folderPath, message,setMessage} = useAppContext();

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
        <div className="relative flex flex-col items-start">
            <button
                className="rounded ms-3 shadow p-1 ps-3 pe-3 bg-themeYellow-default hover:bg-themeYellow-light"
                onClick={exportToCSV}
            >
                Export {plugin}.csv
            </button>
            {message && (
                <div className="absolute top-full mt-2">
                    {message}
                </div>
            )}
        </div>
    );

}

export default ExportButton;