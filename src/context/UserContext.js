import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const validateUser = {
        email: "dgpays@mail.com",
        password: "123",
    }


    const checkUser = () => {
        if (validateUser.email === userInfo.email && validateUser.password === userInfo.password) {
            setIsLogin(true);
        }
    }

    useEffect(() => {
        checkUser();
    }, [userInfo]);


    const values = {
        isLogin,
        userInfo,
        setUserInfo,
    }

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
}


export const useUserContext = () => useContext(UserContext);

