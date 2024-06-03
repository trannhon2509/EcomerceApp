import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoutePath from '../routes/RoutePath';

const ShoppingCard = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await axios.get('api/shop');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        fetchCartItems();
    }, []);

    const removeCard = async (id) => {
        try {
            console.log('Item removed from cart', id);
            await axios.delete(`api/shop/${id}`);
            // Update the cart items after removing the item
            setCartItems(prevItems => prevItems.filter(item => item.productId !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            // Handle error appropriately, such as displaying an error message.
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            console.log('Updating quantity for item', productId, 'to', quantity);
            await axios.put(`api/shop/${productId}?quantity=${quantity}`);
            // Update the cart items with the new quantity
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item.productId === productId ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.error('Error updating item quantity:', error);
            // Handle error appropriately, such as displaying an error message.
        }
    };

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            // Update the cart item quantity in state immediately for responsive UI
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                )
            );
            // Send the update to the server
            updateQuantity(productId, newQuantity);
        }
    };

    const incrementQuantity = (productId) => {
        const item = cartItems.find(item => item.productId === productId);
        const newQuantity = item.quantity + 1;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
        updateQuantity(productId, newQuantity);
    };

    const decrementQuantity = (productId) => {
        const item = cartItems.find(item => item.productId === productId);
        const newQuantity = Math.max(1, item.quantity - 1);
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
        updateQuantity(productId, newQuantity);
    };

    return (
        <div className="container mb-5">
            <div className="row bootstrap snippets">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-12 col-sm-12 text-center mb-3">
                        <h2 className="title">SHOPPING CART</h2>
                    </div>
                    <div className="col-lg-12 col-sm-12 hero-feature">
                        <div className="table-responsive">
                            <table className="table table-bordered tbl-cart">
                                <thead>
                                    <tr>
                                        <th className="hidden-xs">Image</th>
                                        <th>Product Name</th>
                                        <th>Unit price</th>
                                        <th>Quantity</th>
                                        <th className="text-center">Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.productId}>
                                            <td className="hidden-xs">
                                                <img src={item.imageUrl} alt={item.name} title width={47} height={47} />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <div className="input-group">
                                                    <span className="input-group-btn">
                                                        <button
                                                            className="btn btn-default"
                                                            type="button"
                                                            onClick={() => decrementQuantity(item.productId)}
                                                        >
                                                            <i className="bi bi-dash-lg"></i>
                                                        </button>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.productId, e)}
                                                        min="1"
                                                    />
                                                    <span className="input-group-btn">
                                                        <button
                                                            className="btn btn-default"
                                                            type="button"
                                                            onClick={() => incrementQuantity(item.productId)}
                                                        >
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>${(item.quantity * item.price).toFixed(2)}</td>
                                            <td className="text-center">
                                                <button className='btn btn-success' onClick={() => removeCard(item.productId)}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} align="right">
                                            Total: ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-group btns-cart">
                            <Link to={RoutePath.ProductPage} className="btn btn-primary">
                                <i className="fa fa-arrow-circle-left" /> Continue Shopping
                            </Link>
                            <button type="button" className="btn btn-primary">Update Cart</button>
                            <Link to={RoutePath.CHECKOUT} className="btn btn-primary">
                                Checkout <i className="fa fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard;
