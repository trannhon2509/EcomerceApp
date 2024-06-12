import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalPages: 1,
            currentPage: 1,
            selectedProduct: null,
            showModal: false,
            newProductFormData: {
                name: '',
                description: '',
                price: '',
                quantity: '',
                categoryId: '', // Assuming you have a categoryId for product category
                status: true // Assuming status is active by default
            }
        };
    }

    componentDidMount() {
        this.fetchProducts(1);
    }

    fetchProducts = (page) => {
        axios
            .get(`https://localhost:44412/api/products?page=${page}&pageSize=8`)
            .then((response) => {
                this.setState({
                    products: response.data.results,
                    totalPages: response.data.totalPages,
                    currentPage: page,
                });
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        this.fetchProducts(selected);
    };

    showModal = (product) => {
        this.setState({ selectedProduct: product, showModal: true });
    };

    hideModal = () => {
        this.setState({ selectedProduct: null, showModal: false });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            newProductFormData: {
                ...prevState.newProductFormData,
                [name]: value
            }
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://localhost:44412/api/products', this.state.newProductFormData)
            .then((response) => {
                this.fetchProducts(this.state.currentPage);
                this.hideModal();
            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    };

    render() {
        const { products, totalPages, showModal, selectedProduct } = this.state;

        const truncateText = (text, length) => {
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        };

        return (
            <div className="container mt-5">
                <h1>Product List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((productWrapper) => {
                            const { product, comments, images } = productWrapper;
                            return (
                                <tr key={product.id}>
                                    <td>
                                        {images.length > 0 && (
                                            <img
                                                src={images[0].imageUrl}
                                                className="img-thumbnail"
                                                alt="product"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        )}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{truncateText(product.description, 50)}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{productWrapper.productCategoryName}</td>
                                    <td>{product.status ? "Active" : "Unactive"}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.showModal(productWrapper)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />

                {showModal && selectedProduct && (
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="productModalLabel"
                        aria-hidden="true"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="productModalLabel">
                                        {selectedProduct.product.name}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={this.hideModal}
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                                    <div className="text-center mb-3">
                                        {selectedProduct.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.imageUrl}
                                                className="img-fluid img-thumbnail mx-1"
                                                alt="product"
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ))}
                                    </div>
                                    <p>
                                        <strong>Description:</strong> {selectedProduct.product.description}
                                    </p>
                                    <p>
                                        <strong>Price:</strong> {selectedProduct.product.price}
                                    </p>
                                    <p>
                                        <strong>Quantity:</strong> {selectedProduct.product.quantity}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {selectedProduct.productCategoryName}
                                    </p>
                                    <p>
                                        <strong>Information:</strong> {selectedProduct.product.information}
                                    </p>

                                    <h6>Comments:</h6>
                                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                        {selectedProduct.comments.map((comment, index) => (
                                            <div key={index} className="comment">
                                                <p>
                                                    <strong>{comment.user.userName}:</strong> {comment.content}
                                                </p>
                                                <p className="text-muted">
                                                    <small>{new Date(comment.createdAt).toLocaleString()}</small>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={this.hideModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}