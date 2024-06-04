import {useAppContext} from "../../context/Context";

const ExportButton = ({report}) => {

    const {folderPath,projectName} = useAppContext();

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


        window.fileAPI.saveCSV(folderPath,projectName,csvContent);

    }



    return (
        <button onClick={exportToCSV}>Export</button>
    )


}

export default ExportButton;