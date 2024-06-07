import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchProducts, deleteProduct, updateProductStatus, saveProduct } from '../../redux/actions/productActions';
import authService from '../api-authorization/AuthorizeService';
import ProductRow from './ProductRow';
import ProductModal from './ProductModal';
import { Button } from 'react-bootstrap';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            pageSize: 6,
            showModal: false,
            currentProduct: null
        };
    }

    componentDidMount() {
        this.populateProductData();
    }

    async populateProductData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');
        if (roles) {
            const { currentPage, pageSize } = this.state;
            this.props.fetchProducts(currentPage + 1, pageSize, token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({ currentPage: selected }, () => {
            this.populateProductData();
        });
    };

    handleShowModal = (product = null) => {
        this.setState({ showModal: true, currentProduct: product });
    };

    handleHideModal = () => {
        this.setState({ showModal: false, currentProduct: null });
    };

    handleSaveProduct = (product) => {
        this.props.saveProduct(product);
        this.handleHideModal();
    };

    render() {
        const { loading, loadingUpdate, products, error, totalPages, deleteProduct, updateProductStatus } = this.props;
        const { showModal, currentProduct } = this.state;

        let contents = loading
            ? <p style={{ height: '600px' }}><em>Loading...</em></p>
            : error
                ? <p><em>{error}</em></p>
                : (
                    <table className="table table-striped" aria-labelledby="tableLabel" style={{ height: '600px' }}>
                        <thead>
                            <tr>
                                <th>Images</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Comments</th>
                                <th>Status</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    onDelete={deleteProduct}
                                    onUpdateStatus={updateProductStatus}
                                    loadingUpdate={loadingUpdate}
                                    onEdit={() => this.handleShowModal(product)}
                                    status={product.status ? 'Inactive' : 'Active'}
                                />
                            )}
                        </tbody>
                    </table>
                );

        return (
            <div>
                <h1 id="tableLabel">Product List</h1>
                <p>This component demonstrates fetching product data from the server.</p>
                <Button variant="primary" onClick={() => this.handleShowModal()}>Add Product</Button>
                {contents}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLinkClassName="page-link"
                />
                <ProductModal
                    show={showModal}
                    onHide={this.handleHideModal}
                    onSave={this.handleSaveProduct}
                    product={currentProduct}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loadingProducts: state.products.loadingProducts,
        loadingUpdate: state.products.loadingUpdate,
        products: state.products.products,
        error: state.products.error,
        totalPages: state.products.totalPages
    };
};

const mapDispatchToProps = {
    fetchProducts,
    deleteProduct,
    updateProductStatus,
    saveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
