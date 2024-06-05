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
    setPluginList: () => {},
    searchQuery: "",
    setSearchQuery: () => {},
    error:"",
    setError: () => {},
    step1Completed: false,
    step2Completed: false,
    setStep1Completed: () => {},
    setStep2Completed: () => {},
    isLoading: false,
    setIsLoading: () => {},
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
    const [searchQuery, setSearchQuery] = useState();
    const [error, setError] = useState("");
    const [step1Completed, setStep1Completed] = useState(false);
    const [step2Completed, setStep2Completed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <AppContext.Provider value={{isLoading, setIsLoading, error,setError,osName, systemInfo, setOsName, setSystemInfo, file, setFile, processList, setProcessList, plugins, setPlugins, projectName, setProjectName, folderPath, setFolderPath, allPlugins, setAllPlugins, pluginList, setPluginList, selectedProcess, setSelectedProcess, searchQuery, setSearchQuery, step1Completed, setStep1Completed,
            step2Completed, setStep2Completed }}>
            {children}
        </AppContext.Provider>
    );
};

