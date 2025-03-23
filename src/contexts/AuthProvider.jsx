/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import app from '../firebase.init';


const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
      const userLogin = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    };

      const authInfo={
        user,
        setUser,
        createNewUser,
        loading,
        setLoading,
        userLogin,
        logOut,
        signInWithGoogle,
      }

      useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
            },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;