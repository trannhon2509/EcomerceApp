import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/ProductCard.css';
import RoutePath from '../routes/RoutePath';
export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            isLiked: false,
            loading: !(props.name && props.price && props.imageUrl && props.productId)
        };
    }

    componentDidMount() {
        const { name, price, imageUrl, productId } = this.props;
        if (name && price && imageUrl && productId) {
            this.setState({ loading: false });
        } else {
            // // Simulate data fetchinga
            // setTimeout(() => {
            //     this.setState({ loading: false });
            // }, 2000); // Simulated loading time
            this.setState({ loading: false });
        }
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    }

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    }

    handleLikeClick = () => {
        this.setState(prevState => ({
            isLiked: !prevState.isLiked
        }));
    }

    render() {
        const { name, price, imageUrl, productId } = this.props;
        const { isHovered, isLiked, loading } = this.state;

        return (
            <div className="col-md-4" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="card" style={{ position: 'relative', minHeight: '373px'}}>
                    {loading ? (
                        <div className="loading-overlay d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="ccc" style={{ position: 'relative' }}>
                                <p className="text-center"><img src={imageUrl} className="imw mt-5" style={{maxHeight:'270px', boxSizing:'content-box'}} alt={name} /></p>
                                {isHovered && (
                                    <div className="hover-icons" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                        <Link to={RoutePath.PRODUCTINFO} className="text-decoration-none mr-2">
                                            <i className="bi bi-info-circle"></i>
                                        </Link>
                                        <i
                                            className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart-fill text-warning'}`}
                                            onClick={this.handleLikeClick}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>
                                )}
                            </div>
                            <div className="card-body" style={{ height: '80px' }}>
                                {isHovered ? (
                                    <div className='btn btn-danger w-100' style={{height: '40px'}}>Add to card</div>
                                ) : (
                                    <>
                                        <h5 className="text-center">{name}</h5>
                                        <p className="text-center">Price: {price}</p>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
