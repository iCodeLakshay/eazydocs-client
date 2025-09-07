"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { fetchUser } from "./Server";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await fetchUser();
            // console.log("Fetched User:", fetchedUser);
            
            setUser(fetchedUser);
            setLoading(false);
        };
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, loading, fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export { UserContext };