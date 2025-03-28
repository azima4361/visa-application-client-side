/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import app from '../firebase.init';


const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);
   

    const createNewUser = (email, password, displayName , photoURL) => {
      
      setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const newUser = result.user;
          console.log('new user', newUser)

          return updateProfile(newUser, {
            displayName: displayName,
            photoURL: photoURL
          }).then(() => {
            setUser({ ...newUser, displayName: displayName, photoURL: photoURL });
            return newUser;
          });
        })
        .finally(() => setLoading(false));
       
      };
      
      const userLogin = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
        .finally(() => setLoading(false));
    }

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user); 
        return result.user;
      });
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
        updateProfile,
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