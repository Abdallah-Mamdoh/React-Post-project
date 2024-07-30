import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'

export const AuthContext = createContext("");

export default function AuthDetailsContext(props) {
    const [authUser,setAuthUser] = useState(null);

    useEffect(()=>{
        const authenticate = onAuthStateChanged(auth ,(user)=>{
            if(user){
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
        })
        return()=>{authenticate()};
    },[])
  return (
    <AuthContext.Provider value={authUser}>
        {props.children}
    </AuthContext.Provider>
  )
}
