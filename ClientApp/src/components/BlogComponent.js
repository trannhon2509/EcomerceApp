import React, { Component } from 'react';
import { Container, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getBlogs } from '../redux/actions/blogActions';
import authService from './api-authorization/AuthorizeService';

class BlogComponent extends Component {
    componentDidMount() {
        this.populateBlogData();
    }

    async populateBlogData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');

        if (roles) {
            this.props.getBlogs(token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }

    renderBlogsTable(blogs) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog.id}>
                            <td>{blog.id}</td>
                            <td>{blog.title}</td>
                            <td>{blog.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const { blogs, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <h2>Blogs</h2>
                {this.renderBlogsTable(blogs)}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    blogs: state.blog.blogs,
    loading: state.blog.loading,
    error: state.blog.error
});

const mapDispatchToProps = {
    getBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogComponent);
