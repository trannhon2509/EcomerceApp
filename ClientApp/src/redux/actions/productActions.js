// src/redux/actions/productActions.js
import axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../actionTypes';

export const getProducts = () => {
    return async (dispatch) => {
        dispatch({ type: GET_PRODUCTS });
        try {
            const response = await axios.get('/api/products');
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
        }
    };
};
