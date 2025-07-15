import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Register user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Login user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //  Register user or login user using google
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };
  // update the user
  const updateUser = (name, profilePic) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profilePic,
    });
  };
  //  logout or signout the user
  const signOutUser = () => {
    setLoading(false);
    return signOut(auth);
  };

  //     holding the user untill logout function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("onAuthState", currentUser);
    });

    return () => unsubscribe;
  }, []);

  //    sharing context using authcontext through Objects
  const authInfo = {
    createUser,
    signIn,
    googleSignIn,
    user,
    updateUser,
    signOutUser,
    loading,
    sohel: "sohel",
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
