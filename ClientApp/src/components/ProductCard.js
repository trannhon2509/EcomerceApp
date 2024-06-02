import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RoutePath from '../routes/RoutePath';

const ProductCard = ({ name, price, imageUrl, productId, maxQuantity }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = async () => {
        try {
            console.log('Item added to cart', productId);
            await axios.post(`api/shop/${productId}`);
 
            // Optionally, you can show a success message or update UI to reflect the item being added to the cart.
        } catch (error) {
            console.error('Error adding item to cart:', error);
            // Handle error appropriately, such as displaying an error message.
        }
    };

    return (
        <div className="col-md-4" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="card" style={{ position: 'relative', minHeight: '373px' }}>
                <div className="ccc" style={{ position: 'relative' }}>
                    <p className="text-center"><img src={imageUrl} className="imw mt-5" style={{ maxHeight: '270px', boxSizing: 'content-box' }} alt={name} /></p>
                    {isHovered && (
                        <div className="hover-icons" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <Link to={RoutePath.PRODUCTINFO} className="text-decoration-none mr-2">
                                <i className="bi bi-info-circle"></i>
                            </Link>
                            <i
                                className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart-fill text-warning'}`}
                                onClick={() => setIsLiked(!isLiked)}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>
                    )}
                </div>
                <div className="card-body" style={{ height: '80px' }}>
                    {isHovered ? (
                        <button className='btn btn-danger w-100' style={{ height: '40px' }} onClick={handleAddToCart}>Add to cart</button>
                    ) : (
                        <>
                            <h5 className="text-center">{name}</h5>
                            <p className="text-center">Price: {price}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
