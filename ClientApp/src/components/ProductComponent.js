import React, { Component } from 'react';
import { Container, Table, Input, Label, FormGroup, Col, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import authService from './api-authorization/AuthorizeService';
import ReactPaginate from 'react-paginate';

class ProductComponent extends Component {
    state = {
        searchQuery: '',
        categoryFilter: '',
        minPrice: '',
        maxPrice: '',
        minQuantity: '',
        maxQuantity: '',
        currentPage: 0,
        productsPerPage: 5 // Show 5 products per page
    };

    componentDidMount() {
        this.populateProductData();
        this.props.getCategories();
    }

    handleSearchChange = (e) => {
        this.setState({
            searchQuery: e.target.value,
            currentPage: 0 // Reset to first page on search
        });
    };

    handleCategoryFilterChange = (e) => {
        this.setState({
            categoryFilter: e.target.value,
            currentPage: 0 // Reset to first page on category filter change
        });
    };

    handleMinPriceChange = (e) => {
        this.setState({
            minPrice: e.target.value,
            currentPage: 0 // Reset to first page on price filter change
        });
    };

    handleMaxPriceChange = (e) => {
        this.setState({
            maxPrice: e.target.value,
            currentPage: 0 // Reset to first page on price filter change
        });
    };

    handleMinQuantityChange = (e) => {
        this.setState({
            minQuantity: e.target.value,
            currentPage: 0 // Reset to first page on quantity filter change
        });
    };

    handleMaxQuantityChange = (e) => {
        this.setState({
            maxQuantity: e.target.value,
            currentPage: 0 // Reset to first page on quantity filter change
        });
    };

    getCategoryName = (categoryId) => {
        const category = this.props.categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    };

    renderProductsTable(products) {
        const { searchQuery, categoryFilter, minPrice, maxPrice, minQuantity, maxQuantity, currentPage, productsPerPage } = this.state;
        const { categories } = this.props;

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (categoryFilter === '' || product.productCategoryId === parseInt(categoryFilter)) &&
            (minPrice === '' || product.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || product.price <= parseFloat(maxPrice)) &&
            (minQuantity === '' || product.quantity >= parseInt(minQuantity)) &&
            (maxQuantity === '' || product.quantity <= parseInt(maxQuantity))
        );

        const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
        const offset = currentPage * productsPerPage;
        const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);

        return (
            <React.Fragment>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Search by product name"
                                value={searchQuery}
                                onChange={this.handleSearchChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="select" value={categoryFilter} onChange={this.handleCategoryFilterChange}>
                                <option value="">All categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label>Min Price:</Label>
                            <Input type="number" value={minPrice} onChange={this.handleMinPriceChange} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label>Max Price:</Label>
                            <Input type="number" value={maxPrice} onChange={this.handleMaxPriceChange} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label>Min Quantity:</Label>
                            <Input type="number" value={minQuantity} onChange={this.handleMinQuantityChange} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label>Max Quantity:</Label>
                            <Input type="number" value={maxQuantity} onChange={this.handleMaxQuantityChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
                            <tr key={product.id}>
                                <td><img src={product.imageUrl} width={80} alt="Product" /></td>
                                <td>{product.name}</td>
                                <td>{this.getCategoryName(product.productCategoryId)}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.status ? 'Active' : 'Inactive'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                />
            </React.Fragment>
        );
    }

    render() {
        const { products, loading, error, categoriesLoading } = this.props;

        if (loading || categoriesLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <h2>Products</h2>
                {this.renderProductsTable(products)}
            </Container>
        );
    }

    async populateProductData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');

        if (roles) {
            this.props.getProducts(token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    loading: state.product.loading,
    error: state.product.error,
    categories: state.category.categories,
    categoriesLoading: state.category.loading,
});

const mapDispatchToProps = {
    getProducts,
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
