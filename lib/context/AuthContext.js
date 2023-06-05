import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3000/api/auth/user",
        }).then((res) => {
            if (res.data.user) {
                setUser("res.data.user");
            }

            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
  }, []);

  const value = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider as default };
