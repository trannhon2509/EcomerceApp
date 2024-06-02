import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import authService from './api-authorization/AuthorizeService';
import ProductRow from './ProductRow';

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
            error: null
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

    restoreProduct = async (id) => {
        const token = await authService.getAccessToken();
        try {
            await axios.patch(`/api/Products/${id}/status`, { status: true }, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            this.populateProductData();
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { loadingProducts, loadingDelete, products, error, totalPages } = this.state;

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
                                    onRestore={this.restoreProduct}
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
            </div>
        );
    }
}

export default ProductComponent;
