import React, { useState, useEffect, createContext, useContext } from 'react';
const axios = require('axios');

// const UserGlobalContextProvider = ({ children }) => {
//     const [user, setUser] = useState({});
//     const [fetchingUser, setFetchingUser] = useState(true);

//     useEffect(() => {
//         axios.post("/api/is-authenticated", null, {
//             withCredentials: true,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//             },
//         })
//             .then((response) => {
//                 console.log(`Fetched session for user: ${response.data.user}`);
//                 setUser(response.data.user);
//             })
//             .catch((error) => {
//                 console.log(`No user exists with the current session... ${error}`);
//             })
//             .finally(() => {
//                 setFetchingUser(false);
//             });
//     }, []);

//     return (
//         <UserGlobalContext.Provider
//             value={{
//                 user: user,
//                 setUser: setUser,
//                 fetchingUser: fetchingUser
//             }}
//         >
//             {children}
//         </UserGlobalContext.Provider>
//     );
// };

const UserGlobalContext = createContext({ user: {}, setUser: () => { }, fetchingUser: true, setFetchingUser: () => { } });

const useAuth = () => {
    const context = useContext(UserGlobalContext);

    if (context === undefined) {
        throw new Error();
    }

    return context;
};

const UserGlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [fetchingUser, setFetchingUser] = useState(true);

    const value = { user, setUser, fetchingUser, setFetchingUser };

    useEffect(() => {
        axios.get("/api/is-authenticated")
            .then((res) => {
                if (res.status && res.status === 200) {
                    console.log("Fetched session");

                    setUser(res.data.user);

                    setFetchingUser(false);
                }
            })
            .catch((error) => {
                console.log(`No user exists with the current session... ${error}`);
            });
    }, []);

    return <UserGlobalContext.Provider value={value}>
        {children}
    </UserGlobalContext.Provider>;
};

export { UserGlobalContextProvider, useAuth };
