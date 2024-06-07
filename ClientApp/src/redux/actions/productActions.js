import axios from 'axios';
import { toast } from 'react-toastify';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_STATUS_SUCCESS,
    UPDATE_PRODUCT_STATUS_FAILURE
} from '../actionTypes';

export const fetchProducts = (page, pageSize) => {
    return async dispatch => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        try {
            const response = await axios.get(`api/Products?page=${page}&pageSize=${pageSize}`);
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_PRODUCTS_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteProduct = (productId) => async dispatch => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    try {
        await axios.delete(`/api/products/${productId}`);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: productId
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.message
        });
    }
};

export const updateProductStatus = (productId, status) => async dispatch => {
    dispatch({ type: 'UPDATE_PRODUCT_STATUS_REQUEST' });

    try {
        await axios.patch(`/api/products/${productId}/status`, { status });
        dispatch({
            type: UPDATE_PRODUCT_STATUS_SUCCESS,
            payload: { productId, status }
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_STATUS_FAILURE,
            payload: error.message
        });
    }
};

export const saveProduct = (product, token) => async (dispatch) => {
    try {
        console.log("Sending product data:", product);
        const response = await axios.post('/api/products', product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Response data:", response.data);
        dispatch({ type: SAVE_PRODUCT_SUCCESS, payload: response.data });
        toast.success('Product saved successfully!');
    } catch (error) {
        console.error("Error saving product:", error.response || error.message);
        dispatch({ type: SAVE_PRODUCT_FAILURE, payload: error.message });
        toast.error('Failed to save product!');
    }
};

export const updateProduct = (product, token) => async (dispatch) => {
    try {
        console.log("Sending updated product data:", product);
        const response = await axios.put(`/api/products/${product.id}`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Response data:", response.data);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
        toast.success('Product updated successfully!');
    } catch (error) {
        console.error("Error updating product:", error.response || error.message);
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
        toast.error('Failed to update product!');
    }
};
