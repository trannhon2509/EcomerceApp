// src/components/CategoriesComponent.js
import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
import authService from './api-authorization/AuthorizeService';

class CategoriesComponent extends Component {
    componentDidMount() {
        this.populateCategoryData();
    }

    renderCategoriesTable(categories) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const { categories, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <h2>Categories</h2>
                {this.renderCategoriesTable(categories)}
            </Container>
        );
    }

    async populateCategoryData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');

        if (roles) {
            this.props.getCategories(token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    loading: state.category.loading,
    error: state.category.error
});

const mapDispatchToProps = {
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesComponent);
