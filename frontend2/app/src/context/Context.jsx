import React from "react";


export const Context = React.createContext<{
    osName: undefined,
    systemInfo: undefined,
    setOsName: () => {},
    setSystemInfo: () => {}
}>({
    osName: "",
    systemInfo: [],
    setOsName: () => {},
    setSystemInfo: () => {}
});
