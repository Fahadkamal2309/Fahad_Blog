import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [account, setAccount] = useState({
        name: '',
        username: ''
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');

        if (storedUser) {
            setAccount(JSON.parse(storedUser));   // ✅ FIX
        }
    }, []);

    return (
        <DataContext.Provider value={{ account, setAccount }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;


