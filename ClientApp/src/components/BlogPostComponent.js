// src/components/BlogPostComponent.js
import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getBlogPosts } from '../redux/actions/blogPostActions';
import authService from './api-authorization/AuthorizeService';
import axios from 'axios';

class BlogPostComponent extends Component {
    componentDidMount() {
        this.populateBlogPostData();
    }

    renderBlogPostsTable(blogPosts) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Content</th>
                        <th>Posted On</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    { 
                    
                    blogPosts.map(blogPost => (
                        
                        <tr key={blogPost.id}>
                            <td>{blogPost.id}</td>
                            <td>{blogPost.authorId}</td>
                            <td>{blogPost.title}</td>
                            <td>{ 
                                console.log(this.getTypeName(blogPost.blogId))
                            }</td>
                            <td>{blogPost.content}</td>
                            <td>{new Date(blogPost.postedOn).toLocaleDateString()}</td>
                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    getTypeName(blogId) {
        try {
            const response =  axios.get(`/api/Blogs/GetBlogName/${blogId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching blog name:', error);
            return ''; // Return empty string if there's an error
        }
    }
    render() {
        const { blogPosts, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <h2>Blog Posts</h2>
                {this.renderBlogPostsTable(blogPosts)}
            </Container>
        );
    }

    async populateBlogPostData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');

        if (roles) {
            this.props.getBlogPosts(token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }
}

const mapStateToProps = state => ({
    blogPosts: state.blogPost.blogPosts,
    loading: state.blogPost.loading,
    error: state.blogPost.error
});

const mapDispatchToProps = {
    getBlogPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostComponent);
