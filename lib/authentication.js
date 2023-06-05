import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    
    function signup(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    function signin(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    function signout() {
        return firebase.auth().signOut();
    }

    function resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

