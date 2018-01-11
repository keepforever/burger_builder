import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// async action creator thanks to redux-thunk
export const auth = (email, password) => {
    return dispatch => {
        console.log('email', email)
        console.log('password', password)
        dispatch(authStart());
        const APIurl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCB1HaXTK2qiqsr1BmQW936xcfgjvxNwmI';
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(APIurl, authData)
            .then(response => {
                console.log('POST RESPONSE:', response)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    }
}
