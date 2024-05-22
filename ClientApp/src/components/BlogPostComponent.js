import React, { Component } from 'react';
import { Container, Table, Input, Button, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getBlogPosts } from '../redux/actions/blogPostActions';
import authService from './api-authorization/AuthorizeService';
import axios from 'axios';

class BlogPostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogNames: {}, // Store blog names by blogId
            userNames: {}, // Store usernames by userId
            searchQuery: '',
            filterType: '',
            startDate: '',
            endDate: ''
        };
    }

    componentDidMount() {
        this.populateBlogPostData();
    }

    async getTypeName(blogId) {
        try {
            const response = await axios.get(`/api/Blogs/GetBlogName/${blogId}`);
            const blogName = response.data;
            this.setState(prevState => ({
                blogNames: {
                    ...prevState.blogNames,
                    [blogId]: blogName
                }
            }));
        } catch (error) {
            console.error('Error fetching blog name:', error);
        }
    }

    async getUserName(userId) {
        try {
            const response = await axios.get(`/api/ApplicationUsers/${userId}`);
            const user = response.data;
            this.setState(prevState => ({
                userNames: {
                    ...prevState.userNames,
                    [userId]: user.userName
                }
            }));
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.blogPosts !== this.props.blogPosts) {
            this.props.blogPosts.forEach(blogPost => {
                if (!this.state.blogNames[blogPost.blogId]) {
                    this.getTypeName(blogPost.blogId);
                }
                if (!this.state.userNames[blogPost.authorId]) {
                    this.getUserName(blogPost.authorId);
                }
            });
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleTypeChange = (event) => {
        this.setState({ filterType: event.target.value });
    };

    handleStartDateChange = (event) => {
        this.setState({ startDate: event.target.value });
    };

    handleEndDateChange = (event) => {
        this.setState({ endDate: event.target.value });
    };

    filterBlogPosts = (blogPosts) => {
        const { searchQuery, filterType, startDate, endDate } = this.state;
        return blogPosts.filter(blogPost => {
            const matchesSearchQuery = blogPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (this.state.userNames[blogPost.authorId] && this.state.userNames[blogPost.authorId].toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesType = filterType ? this.state.blogNames[blogPost.blogId] === filterType : true;
            const blogPostDate = new Date(blogPost.postedOn);
            const matchesStartDate = startDate ? blogPostDate >= new Date(startDate) : true;
            const matchesEndDate = endDate ? blogPostDate <= new Date(endDate) : true;
            return matchesSearchQuery && matchesType && matchesStartDate && matchesEndDate;
        });
    };

    renderBlogPostsTable(blogPosts) {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Content</th>
                        <th>Posted On</th>
                    </tr>
                </thead>
                <tbody>
                    {blogPosts.map(blogPost => (
                        <tr key={blogPost.id}>
                            <td>{this.state.userNames[blogPost.authorId] || 'Loading...'}</td>
                            <td>{blogPost.title}</td>
                            <td>{this.state.blogNames[blogPost.blogId] || 'Loading...'}</td>
                            <td>{blogPost.content}</td>
                            <td>{new Date(blogPost.postedOn).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const { blogPosts, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const filteredBlogPosts = this.filterBlogPosts(blogPosts);

        return (
            <Container fluid>
                <h2>Blog Posts</h2>
                <Form className="mb-3">
                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="searchQuery">Search</Label>
                                <Input
                                    type="text"
                                    name="search"
                                    id="searchQuery"
                                    placeholder="Search by author or title"
                                    value={this.state.searchQuery}
                                    onChange={this.handleSearchChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="filterType">Type</Label>
                                <Input
                                    type="select"
                                    name="type"
                                    id="filterType"
                                    value={this.state.filterType}
                                    onChange={this.handleTypeChange}
                                >
                                    <option value="">All</option>
                                    {Object.values(this.state.blogNames).map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="startDate">Start Date</Label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    value={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="endDate">End Date</Label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    value={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} className="align-self-end">
                            <Button type="button" onClick={() => this.setState({ searchQuery: '', filterType: '', startDate: '', endDate: '' })} className="mt-2">Reset</Button>
                        </Col>
                    </Row>
                </Form>
                {this.renderBlogPostsTable(filteredBlogPosts)}
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
