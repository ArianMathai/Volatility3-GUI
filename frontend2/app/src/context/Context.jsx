import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({
    osName: '',
    file: '',
    systemInfo: [],
    processList: [],
    setOsName: () => {},
    setSystemInfo: () => {},
    setFile: () => {},
    setProcessList: () => {}
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [file, setFile] = useState(null);
    const [osName, setOsName] = useState('');
    const [systemInfo, setSystemInfo] = useState([]);
    const [processList, setProcessList] = useState([]);

    return (
        <AppContext.Provider value={{ osName, systemInfo, setOsName, setSystemInfo, file, setFile, processList, setProcessList }}>

            {children}
        </AppContext.Provider>
    );
};

