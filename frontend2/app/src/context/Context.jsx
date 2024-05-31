import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({
    osName: '',
    file: '',
    systemInfo: [],
    pslist: [],
    setOsName: () => {},
    setSystemInfo: () => {},
    setFile: () => {},
    setPslist: () => {}
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [file, setFile] = useState(null);
    const [osName, setOsName] = useState('');
    const [systemInfo, setSystemInfo] = useState([]);

    const [pslist, setPslist] = useState([]);

    return (
        <AppContext.Provider value={{ osName, systemInfo, setOsName, setSystemInfo, file, setFile, pslist, setPslist }}>

            {children}
        </AppContext.Provider>
    );
};

