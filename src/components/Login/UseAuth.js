import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInUser = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                window.history.back();
                return response.user;
            })
            .catch(err => {
                console.log(err.message);
                setUser(null);
                return err.message;
            })
    };


    const createUser = (email, password, name) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                firebase.auth().currentUser.updateProfile({
                    displayName: name,
                    email: email
                }).then(() => {
                    setUser(res.user);
                    window.history.back();
                });
            })
            .catch(err => setUser({ error: err.message }))
    }


    const signOut = () => {
        return firebase.auth().signOut()
            .then(() => {
                setUser(false);
            })
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return {
        user,
        signInUser,
        createUser,
        signOut
    };
}

export default Auth;