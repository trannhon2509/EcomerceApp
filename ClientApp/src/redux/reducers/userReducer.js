// src/redux/reducers/userReducer.js
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    users: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return { ...state, loading: true };
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default userReducer;
