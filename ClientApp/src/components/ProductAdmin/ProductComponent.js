import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import authService from '../api-authorization/AuthorizeService';
import ProductRow from './ProductRow';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditProductModal from './EditProductModal'; // Import EditProductModal

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loadingProducts: true,
            loadingDelete: false,
            currentPage: 0,
            pageSize: 6,
            totalPages: 0,
            error: null,
            showAddModal: false,
            showEditModal: false,
            editingProduct: null
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
            try {
                const response = await axios.get('/api/Products', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
                    params: {
                        page: currentPage + 1,
                        pageSize: pageSize
                    }
                });
                this.setState({
                    products: response.data.results,
                    loadingProducts: false,
                    totalPages: response.data.totalPages,
                    error: null
                });
            } catch (error) {
                this.setState({ loadingProducts: false, error: error.message });
            }
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({ currentPage: selected, loadingProducts: true }, () => {
            this.populateProductData();
        });
    };

    deleteProduct = async (id) => {
        const token = await authService.getAccessToken();
        this.setState({ loadingDelete: true });
        try {
            await axios.delete(`/api/Products/${id}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            this.populateProductData();
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ loadingDelete: false });
        }
    };

    editProduct = (product) => {
        this.setState({ editingProduct: product, showEditModal: true });
    };

    updateProduct = async (updatedProduct) => {
        const token = await authService.getAccessToken();
        try {
            await axios.put(`/api/Products/${updatedProduct.id}`, updatedProduct, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            this.setState({ editingProduct: null, showEditModal: false });
            this.populateProductData();
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    addProduct = async (newProduct) => {
        const token = await authService.getAccessToken();
        try {
            await axios.post('/api/Products', newProduct, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            this.setState({ showAddModal: false });
            this.populateProductData();
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { loadingProducts, loadingDelete, products, error, totalPages, editingProduct, showAddModal, showEditModal } = this.state;

        let contents = loadingProducts
            ? <p style={{ height: '600px' }}><em>Loading...</em></p>
            : error
                ? <p><em>{error}</em></p>
                : (
                    <table className="table table-striped" aria-labelledby="tableLabel" style={{ height: '600px' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Comments</th>
                                <th>Images</th>
                                <th style={{ width: '200px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    onDelete={this.deleteProduct}
                                    onEdit={this.editProduct}
                                    loadingDelete={loadingDelete}
                                />
                            )}
                        </tbody>
                    </table>
                );

        return (
            <div>
                <h1 id="tableLabel">Product List</h1>
                <p>This component demonstrates fetching product data from the server.</p>
                <Button color="primary" onClick={() => this.setState({ showAddModal: true })}>Add Product</Button>
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

                <Modal isOpen={showEditModal} toggle={() => this.setState({ showEditModal: false })}>
                    <ModalHeader toggle={() => this.setState({ showEditModal: false })}>Edit Product</ModalHeader>
                    <ModalBody>
                        <EditProductModal
                            isOpen={showEditModal}
                            toggle={() => this.setState({ showEditModal: false })}
                            product={editingProduct}
                            categories={categories}  // Pass categories as a prop
                            onSave={this.updateProduct}
                            onCancel={() => this.setState({ showEditModal: false })}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ProductComponent;
