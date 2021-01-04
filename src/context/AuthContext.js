import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import noteinApi from '../api/notein';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'sign_out':
            return {token: null, errorMessage: ''}
        case 'clear_error_message':
            return {...state, errorMessage: '', successMessage: ''};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'sign_in':
            return {errorMessage: '', token: action.payload};
        case 'set_loading':
            return {...state, loading: action.payload};
        case 'change_password':
            return {...state, successMessage: "Password Berhasil di ubah"};
        case 'whoami':
            return {...state, whoami: action.payload}
        default:
            return state;
    }
};

const signup = (dispatch) => async ({username, password, password_confirmation}) => {
    dispatch({type: 'set_loading', payload: true});
    try{
        const response = await noteinApi.post('/users', {username, password, password_confirmation});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'sign_in', payload: response.data.token});

        navigate('NoteList');
    } catch (err){
        dispatch({type: 'add_error', payload: err.response.data.error})
    }
    dispatch({type: 'set_loading', payload: false});
};


const signin = (dispatch) => {
    return async ({username, password}) => {
        dispatch({type: 'set_loading', payload: true});
        try{
            const response = await noteinApi.post('/login', {username, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'sign_in', payload: response.data.token});
    
            navigate('NoteList');
        } catch (err){
            dispatch({type: 'add_error', payload: err.response.data.error})
        }
        dispatch({type: 'set_loading', payload: false});
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'sign_out'});
        navigate('Signin');
    };
};

const updateProfile = (dispatch) => {
    return async ({password, password_confirmation}) => {
        dispatch({type: 'set_loading', payload: true});
        try{
            const response = await noteinApi.put('/users/current', {password, password_confirmation});
            dispatch({type: 'change_password'})
        } catch (err){
            dispatch({type: 'add_error', payload: err.response.data.error})
        }
        dispatch({type: 'set_loading', payload: false});
    } 
}

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_error_message'});
    }
}

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            dispatch({type: 'signin', payload: token});
            navigate('NoteList');
        } else{
            navigate('Signup');
        }
    }
}

const whoami = (dispatch) => {
    return async () => {
        const response = await noteinApi.get('/auto_login');
        dispatch({type: 'whoami', payload: response.data.username});
    }
}

export const {Provider, Context} = createDataContext(authReducer, {signup, signin, signout, clearErrorMessage, tryLocalSignin, updateProfile, whoami}, {token: null, errorMessage: ''})