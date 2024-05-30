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
                                        <tr key={item.id}>
                                            <td className="hidden-xs">
                                                <img src={item.imageUrl} alt={item.name} title width={47} height={47} />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>${item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.quantity * item.price}</td>
                                            <td className="text-center">
                                                <Link to={`/remove/${item.id}`} className="remove_cart" rel={2}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} align="right">Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-group btns-cart">
                            <Link to={RoutePath.ProductPage} className="btn btn-primary"><i className="fa fa-arrow-circle-left" /> Continue Shopping</Link>
                            <button type="button" className="btn btn-primary">Update Cart</button>
                            <Link to={RoutePath.CHECKOUT} className="btn btn-primary">Checkout <i className="fa fa-arrow-circle-right" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard;
