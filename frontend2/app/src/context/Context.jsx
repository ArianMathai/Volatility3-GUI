import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({
    osName: '',
    systemInfo: [],
    setOsName: () => {},
    setSystemInfo: () => {},
    setProcessList: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [osName, setOsName] = useState('');
    const [systemInfo, setSystemInfo] = useState([]);
    const [processList, setProcessList] = useState([]);

    return (
        <AppContext.Provider value={{ osName, systemInfo, processList, setOsName, setSystemInfo, setProcessList }}>
            {children}
        </AppContext.Provider>
    );
};

