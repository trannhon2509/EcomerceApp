import React, { Component } from 'react';
import { Container, Table, Input, Label, FormGroup, Col, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import authService from './api-authorization/AuthorizeService';

class ProductComponent extends Component {
    state = {
        searchQuery: '',
        categoryFilter: '',
        minPrice: '',
        maxPrice: '',
        minQuantity: '',
        maxQuantity: ''
    };

    componentDidMount() {
        this.populateProductData();
        this.props.getCategories();
    }

    handleSearchChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    handleCategoryFilterChange = (e) => {
        this.setState({
            categoryFilter: e.target.value
        });
    };

    handleMinPriceChange = (e) => {
        this.setState({
            minPrice: e.target.value
        });
    };

    handleMaxPriceChange = (e) => {
        this.setState({
            maxPrice: e.target.value
        });
    };

    handleMinQuantityChange = (e) => {
        this.setState({
            minQuantity: e.target.value
        });
    };

    handleMaxQuantityChange = (e) => {
        this.setState({
            maxQuantity: e.target.value
        });
    };

    getCategoryName = (categoryId) => {
        const category = this.props.categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    renderProductsTable(products) {
        const { searchQuery, categoryFilter, minPrice, maxPrice, minQuantity, maxQuantity } = this.state;
        const { categories } = this.props;

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (categoryFilter === '' || product.productCategoryId === parseInt(categoryFilter)) &&
            (minPrice === '' || product.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || product.price <= parseFloat(maxPrice)) &&
            (minQuantity === '' || product.quantity >= parseInt(minQuantity)) &&
            (maxQuantity === '' || product.quantity <= parseInt(maxQuantity))
        );

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
                        {filteredProducts.map(product => (
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
