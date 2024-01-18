import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstTimePassword, setFirstTimePassword] = useState(null);
    
    const addUid = (uid) => {
        setUid(uid);
        localStorage.setItem('neza_brand_uid', uid);
    }

    const addEmail = (email) => {
        setEmail(email);
        localStorage.setItem('neza_brand_email',email);
    }

    const addFirstTimePassord = (firstTimePassword) => {
        setFirstTimePassword(firstTimePassword);
        localStorage.setItem('brandFirstTimePassword', firstTimePassword);
    }

    const logout = () => {
        setEmail(null);
        setUid(null);
        setFirstTimePassword(null);

        localStorage.removeItem('neza_brand_email');
        localStorage.removeItem('neza_brand_uid');
        localStorage.removeItem('brandFirstTimePassword');
    }


    const isEmailSet = async () => {
        try{
            let email = localStorage.getItem('neza_brand_email');

            if(email){
                setEmail(email);
            }
        }
        catch(e){
            console.log('error setting email');
        }
    }


    const isUidSet = async () => {
        try{
            let uid = localStorage.getItem('neza_brand_uid');

            if(uid){
                setUid(uid);
            }
        }
        catch(e){
            console.log('error setting uid');
        }
    }

    const isFirstTimePasswordSet = async () => {
        try{
            let firstTimePassword = localStorage.getItem('brandFirstTimePassword');

            if(firstTimePassword){
                setFirstTimePassword(firstTimePassword);
            }
        }
        catch(e){
            console.log('error setting firstTimePassword');
        }
    }

    useEffect(()=>{
        isUidSet();
        isEmailSet();
    },[])

    return (
        <AuthContext.Provider value={{ uid, email, firstTimePassword, addEmail, addUid, addFirstTimePassord, logout}}>
            { children }
        </AuthContext.Provider>
    )
}