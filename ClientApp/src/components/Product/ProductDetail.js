// src/components/ProductDetail.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/ProductDetail.css';
import { ProductContext } from '../../context/ProductContext';

const ProductDetail = ({ match }) => {
    const { product, setProduct } = useContext(ProductContext);
    const { productId } = match.params;

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`api/Products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [productId, setProduct]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="product-content product-wrap clearfix product-detail p-sm-0 border-0">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="product-image">
                            <div id="myCarousel-2" className="carousel slide">
                                <ol className="carousel-indicators">
                                    {product.productImages.map((_, index) => (
                                        <li
                                            key={index}
                                            data-target="#myCarousel-2"
                                            data-slide-to={index}
                                            className={index === 0 ? 'active' : ''}
                                        ></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {product.productImages.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img src={image} className="img-responsive" alt={`Product Image ${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#myCarousel-2" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#myCarousel-2" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                        <h2 className="name">{product.name}</h2>
                        <div style={{ fontSize: '8px' }}>
                            {[...Array(5)].map((_, index) => (
                                <i key={index} className={`fa fa-star fa-2x ${index < product.rating ? 'text-warning' : 'text-muted'}`}></i>
                            ))}
                            <span className="fa fa-2x">
                                <h5>({product.votes}) Votes</h5>
                            </span>
                        </div>
                        <hr />
                        <div>
                            <h3 className="price-container">${product.price.toFixed(2)}</h3>
                        </div>
                        <hr />
                        <div className="description description-tabs" style={{ minHeight: '430px' }}>
                            <ul id="myTab" className="nav nav-pills">
                                <li className="nav-item">
                                    <a href="#more-information" data-toggle="tab" className="nav-link active">
                                        Product Description
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#specifications" data-toggle="tab" className="nav-link">
                                        Specifications
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#reviews" data-toggle="tab" className="nav-link">
                                        Reviews
                                    </a>
                                </li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane fade show active" id="more-information" style={{ maxHeight: '219px', overflowY: 'auto' }}>
                                    <br />
                                    <strong>Description Title</strong>
                                    <p>{product.description}</p>
                                </div>
                                <div className="tab-pane fade" id="specifications" style={{ maxHeight: '219px', overflowY: 'auto' }}>
                                    <br />
                                    <dl className="row">
                                        {product.information &&
                                            product.information.split('\n').map((info, index) => (
                                                <React.Fragment key={index}>
                                                    <dt className="col-sm-3">{info.split(':')[0]}</dt>
                                                    <dd className="col-sm-9">{info.split(':')[1]}</dd>
                                                </React.Fragment>
                                            ))}
                                    </dl>
                                </div>
                                <div className="tab-pane fade" id="reviews">
                                    <br />
                                    <form method="post" className="well padding-bottom-10" onSubmit={(e) => e.preventDefault()}>
                                        <textarea rows={2} className="form-control" placeholder="Write a review"></textarea>
                                        <div className="margin-top-10">
                                            <button type="submit" className="btn btn-sm btn-primary pull-right">
                                                Submit Review
                                            </button>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add Location">
                                                <i className="fa fa-location-arrow"></i>
                                            </a>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add Voice">
                                                <i className="fa fa-microphone"></i>
                                            </a>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add Photo">
                                                <i className="fa fa-camera"></i>
                                            </a>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add File">
                                                <i className="fa fa-file"></i>
                                            </a>
                                        </div>
                                    </form>
                                    <div className="chat-body no-padding profile-message" style={{ maxHeight: '219px', overflowY: 'auto' }}>
                                        <ul>
                                            {product.productComments.map((comment, index) => (
                                                <li key={index} className="message">
                                                    <img src={comment.user.imgUrl} className="online" alt="" />
                                                    <span className="message-text">
                                                        {comment.user.userName}
                                                        <span className="badge">Purchase Verified</span>
                                                        <span className="pull-right" style={{ fontSize: '8px' }}>
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                <i key={starIndex} className={`fa fa-star fa-2x ${starIndex < comment.rating ? 'text-primary' : 'text-muted'}`}></i>
                                                            ))}
                                                        </span>
                                                    </span>
                                                    <br />
                                                    <span>{comment.content}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <a href="#" className="btn btn-success btn-lg">Add to cart (${product.price.toFixed(2)})</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
