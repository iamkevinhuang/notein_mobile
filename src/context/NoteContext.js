import createDataContext from './createDataContext';
import noteinApi from '../api/notein';
import {navigate} from '../navigationRef';

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_notes':
            return {notes: action.payload};
        case 'detail_note':
            return {detail: action.payload};
        case 'set_loading':
            return {...state, loading: action.payload};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}

const fetchNotes = dispatch => async () => {
    const response = await noteinApi.get('/notes');
    dispatch({type: 'fetch_notes', payload: response.data});
};

const createNote = dispatch => async (title, body) => {
    dispatch({type: 'set_loading', payload: true});
    try{
        const response = await noteinApi.post('/notes', {title, body});
        dispatch({type: 'set_loading', payload: false});
        navigate('NoteDetail', {id: response.data.id, title: response.data.title});
    } catch (err){
        dispatch({type: 'add_error', payload: err.response.data.error})
        dispatch({type: 'set_loading', payload: false});
    }
};

const editNote = dispatch => async (id, title, body) => {
    dispatch({type: 'set_loading', payload: true});
    try{
        const response = await noteinApi.put(`/notes/${id}`, {title, body});
        dispatch({type: 'set_loading', payload: false});
        navigate('NoteDetail', {id: response.data.id, title: response.data.title});
    } catch (err){
        dispatch({type: 'add_error', payload: err.response.data.error})
        dispatch({type: 'set_loading', payload: false});
    }
};

const deleteNote = dispatch => async (id) => {
    await noteinApi.delete(`/notes/${id}`);
};

const detailNote = dispatch => async (id) => {
    const response = await noteinApi.get(`/notes/${id}`);
    dispatch({type: 'detail_note', payload: response.data});
}


export const {Provider, Context} = createDataContext(noteReducer, {fetchNotes, createNote, editNote, deleteNote, detailNote}, []);