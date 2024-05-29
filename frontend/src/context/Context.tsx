import React from "react";

interface SystemInfoItem {
        Value: string;
        Variable: string;
}

interface SystemInfo {
        processes: SystemInfoItem[];
}

interface ContextProps {
        osName?: string;
        systemInfo?: SystemInfo;
        //setOsName: () => {}
}

export const Context = React.createContext<ContextProps>({
        osName: undefined,
        systemInfo: undefined
})



