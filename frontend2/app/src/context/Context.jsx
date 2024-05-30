import React, { createContext, useState, useContext } from 'react';

export const AppContext = createContext({
    osName: '',
    systemInfo: [],
    setOsName: () => {},
    setSystemInfo: () => {}
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [osName, setOsName] = useState('');
    const [systemInfo, setSystemInfo] = useState([]);

    return (
        <AppContext.Provider value={{ osName, systemInfo, setOsName, setSystemInfo }}>
            {children}
        </AppContext.Provider>
    );
};

