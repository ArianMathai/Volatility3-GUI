/*
const btnFilePath = document.getElementById('filePathBtn');
const filePathOutput = document.getElementById('filePathOutput');

btnFilePath.addEventListener('click', async () => {
    console.log("in eventlistener")
    const filePath = await window.electronAPI.openFile();
    filePathOutput.innerText = `File path: ${filePath}`;
    console.log("click")
});

document.getElementById('submitBtn').addEventListener('click', async () => {
    // Get the file path text content, removing the "File path: " prefix
    const filePath = filePathOutput.innerText.replace('File path: ', '');
    try {
        const response = await window.electronAPI.sendFilePath(filePath);
        const sysInfoList = document.getElementById("sysInfoList");
        const osName = document.getElementById("osName");
        osName.innerHTML = '';
        sysInfoList.innerHTML = '';

        osName.innerHTML = response[0].os;

        response[1].processes.forEach(process => {
            const listItem = document.createElement('li');
            listItem.textContent = `${process.Variable}: ${process.Value}`;
            sysInfoList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error sending file path:', error);
        document.getElementById('responseMessage').innerText = 'Error sending file path';
    }
});

 */




