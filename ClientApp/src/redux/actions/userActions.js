

// src/redux/actions/userActions.js
import axios from 'axios';
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actionTypes';

export const getUsers = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS });
        try {
            const response = await axios.get('/api/applicationUsers');
            dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_USERS_FAILURE, payload: error.message });
        }
    };
};
