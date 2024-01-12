import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const fetchData = useCallback(async () => {
        if (!loaded) {
            axios.get("/profile").then(({ data }) => {
                setUser(data);
                setLoaded(true);
            });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, fetchData, loaded, setLoaded }}>
            {children}
        </UserContext.Provider>
    );
}
