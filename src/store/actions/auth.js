import firebase from '../../utils/firebase';
import "firebase/auth";

import { startLogin, successLogin, errorLogin, startLogout, successLogout, errorLogout } from '../auth';

export const facebookLogin = (fromPath) => {
    return async dispatch => {
        dispatch(startLogin());
        try {
            const provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope("email");
            provider.setCustomParameters({
                display: "popup",
            });
            firebase.auth().useDeviceLanguage();
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credentials = await firebase.auth().signInWithPopup(provider);
            dispatch(successLogin(credentials.user.toJSON()));
        } catch (error) {
            dispatch(errorLogin(error));
        }
    };
};

export const emailLogin = (email, password) => {
    return async dispatch => {
        dispatch(startLogin());
        try {
            const credentials = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(successLogin(credentials.user.toJSON()));
        } catch (error) {
            dispatch(errorLogin(error));
        }
    };
};

export const register = (email, password) => {
    return async dispatch => {
        dispatch(startLogin());
        try {
            const credentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
            dispatch(successLogin(credentials.user.toJSON()));
        } catch (error) {
            dispatch(errorLogin(error));
        }
    };
};

export const logout = () => {
    return async dispatch => {
        try{
            dispatch(startLogout());
            await firebase.auth().signOut();
            dispatch(successLogout({pathTo: '/'}));
        } catch (error) {
            dispatch(errorLogout());
        }
    }
}
