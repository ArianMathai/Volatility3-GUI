import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({
    osName: '',
    systemInfo: [],
    setOsName: () => {},
    setSystemInfo: () => {},
    filePath: '',
    setFilePath: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [osName, setOsName] = useState('');
    const [systemInfo, setSystemInfo] = useState([]);
    const [filePath, setFilePath] = useState('');

    return (
        <AppContext.Provider value={{ osName, systemInfo, setOsName, setSystemInfo, filePath, setFilePath }}>
            {children}
        </AppContext.Provider>
    );
};

