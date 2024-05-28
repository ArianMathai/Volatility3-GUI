window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        const version = process.versions[dependency as keyof NodeJS.ProcessVersions];
        if (version) {
            replaceText(`${dependency}-version`, version);
        }
    }
});
