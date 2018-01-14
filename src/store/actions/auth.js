import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: token
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
// to invalidate auth token after it's 1 hour is up
// multiply expiration time by 1000 to turn miliseconds to seconds
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const logout = () => {
    console.log('auth Actions logout')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

// async action creator thanks to redux-thunk
// isSignUp argument allow us to distinguish between "sign-in" and "sign-up"
// we then conditionally swap out API endpoint targets, depending
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log('isSignUp:', isSignUp)
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCB1HaXTK2qiqsr1BmQW936xcfgjvxNwmI';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCB1HaXTK2qiqsr1BmQW936xcfgjvxNwmI'
        }
        axios.post(url, authData)
            .then(response => {
                console.log('POST RESPONSE:', response)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
