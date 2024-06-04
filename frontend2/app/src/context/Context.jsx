import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({
    osName: '',
    file: '',
    systemInfo: [],
    processList: [],
    projectName: [],
    selectedProcess: [],
    setSelectedProcess: () => {},
    setOsName: () => {},
    setSystemInfo: () => {},
    setFile: () => {},
    setProcessList: () => {},
    plugins: [],
    setPlugins: () => {},
    folderPath: '',
    setFolderPath: () => {},
    allPlugins: [],
    setAllPlugins: () => {},
    pluginList: [],
    setPluginList: () => {}
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [file, setFile] = useState(null);
    const [osName, setOsName] = useState('');
    const [systemInfo, setSystemInfo] = useState([]);
    const [processList, setProcessList] = useState([]);
    const [plugins, setPlugins] = useState([]);
    const [projectName, setProjectName] = useState()
    const [folderPath, setFolderPath] = useState("");
    const [allPlugins, setAllPlugins] = useState([]);
    const [pluginList, setPluginList] = useState([]);
    const [selectedProcess, setSelectedProcess] = useState([]);

    return (
        <AppContext.Provider value={{ osName, systemInfo, setOsName, setSystemInfo, file, setFile, processList, setProcessList, plugins, setPlugins, projectName, setProjectName, folderPath, setFolderPath, allPlugins, setAllPlugins, pluginList, setPluginList, selectedProcess, setSelectedProcess }}>
            {children}
        </AppContext.Provider>
    );
};

