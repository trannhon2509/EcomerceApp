// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import blogPostReducer from './reducers/blogPostReducer';
import orderReducer from './reducers/orderReducer';
import orderDetailReducer  from './reducers/orderDetailReducer';
import blogReducer from './reducers/blogReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    user: userReducer,
    product: productReducer,
    blogPost: blogPostReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
    blog: blogReducer,

});

export default rootReducer;
