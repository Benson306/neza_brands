import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [firstTimePassword, setFirstTimePassword] = useState(null);
    
    const addUid = (uid) => {
        setUid(uid);
        localStorage.setItem('neza_brand_uid', uid);
    }

    const addUserId = (userId) => {
        setUserId(userId);
        localStorage.setItem('neza_brand_user_id', userId);
    }

    const addEmail = (email) => {
        setEmail(email);
        localStorage.setItem('neza_brand_email',email);
    }

    const addRole = (role) => {
        setRole(role);
        localStorage.setItem('role',role);
    }

    const addFirstTimePassord = (firstTimePassword) => {
        setFirstTimePassword(firstTimePassword);
        localStorage.setItem('brandFirstTimePassword', firstTimePassword);
    }

    const logout = () => {
        setEmail(null);
        setUserId(null);
        setRole(null);
        setUid(null);
        setFirstTimePassword(null);

        localStorage.removeItem('neza_brand_email');
        localStorage.removeItem('neza_brand_uid');
        localStorage.removeItem('neza_brand_user_id');
        localStorage.removeItem('role');
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

    const isUserIdSet = async () => {
        try{
            let userId = localStorage.getItem('neza_brand_user_id');

            if(userId){
                setUserId(userId);
            }
        }
        catch(e){
            console.log('error setting userId');
        }
    }

    const isRoleSet = async () => {
        try{
            let role = localStorage.getItem('role');

            if(role){
                setRole(role);
            }
        }
        catch(e){
            console.log('error setting role');
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
        isRoleSet();
        isUserIdSet();
        isUidSet();
        isEmailSet();
    },[])

    return (
        <AuthContext.Provider value={{ uid, userId, role, email, firstTimePassword, addEmail, addRole, addUserId, addUid, addFirstTimePassord, logout}}>
            { children }
        </AuthContext.Provider>
    )
}