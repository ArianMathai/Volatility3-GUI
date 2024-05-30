const btnFilePath = document.getElementById('filePathBtn');
const filePathOutput = document.getElementById('filePathOutput');

btnFilePath.addEventListener('click', async () => {
    console.log("in eventlistener")
    const filePath = await window.electronAPI.openFile();
    filePathOutput.innerText = `File path: ${filePath}`;
    console.log("click")
});