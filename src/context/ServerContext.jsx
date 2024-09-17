import { createContext, useState } from "react";

export const ServerContext = createContext();

export const ServerContextProvider = ({ children }) => {
    const [googleAuth, setGoogleAuth] = useState(false);
    const [clickTaskId, setClickTaskId] = useState('');
    const [date, setDate] = useState(new Date())
    const [clickSearchTaskId, setClickSearchTaskId] = useState('');

    return (
        <ServerContext.Provider value={{
            googleAuth, setGoogleAuth,
            clickTaskId, setClickTaskId,
            date, setDate,
            clickSearchTaskId, setClickSearchTaskId
        }}>
            {children}
        </ServerContext.Provider>
    )
}