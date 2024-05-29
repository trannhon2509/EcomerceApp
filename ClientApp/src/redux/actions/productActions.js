// src/redux/actions/productActions.js
import axios from 'axios';
import { FETCH_PRODUCTS_REQUEST , FETCH_PRODUCTS_SUCCESS,  FETCH_PRODUCTS_FAILURE } from '../actionTypes';


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