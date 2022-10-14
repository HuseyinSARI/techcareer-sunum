import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [wrongPassCount, setWrongPassCount] = useState(0)
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const validateUser = {
        email: "dgpays@mail.com",
        password: "123",
    }


    // user info başarılı şeklide girilise login true çekiliyor ya da yanlış giriş sayısı arttırılıyor.
    const checkUser = () => {
        if (validateUser.email === userInfo.email && validateUser.password === userInfo.password) {
            setIsLogin(true);
        }else{
            setWrongPassCount(wrongPassCount+1);
        }
    }

    useEffect(() => {
        checkUser();        
    }, [userInfo]);


    const values = {
        isLogin,
        userInfo,
        setUserInfo,
        wrongPassCount
    }

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
}


export const useUserContext = () => useContext(UserContext);

