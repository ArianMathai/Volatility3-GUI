import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import backendService from '../Service/backendService';

export interface IContext {
    osState: string | null;
    getOsFromService: (filePath: string) => any
}

export const Context = createContext< IContext | undefined>(undefined);

interface Props {children: ReactNode}

export const ContextProvider: FC<Props> = ({children}) => {
    const [osState, setOsState] = useState<string | null>(null);

    const getOsFromService = async (filePath: string) => {
        const osFromService = await backendService.getOs(filePath)
        console.log(osFromService)
        setOsState(osFromService)
        return osFromService
    }

    useEffect(()=>{
        getOsFromService("/Users/vegardmerkesvik/Documents/Mapper/MemoryDump_Lab1.raw")
    },[])

    return (
        <Context.Provider value={{osState, getOsFromService}}>
            {children}
        </Context.Provider>
    )
};
