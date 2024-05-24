import React, { Component } from 'react';
import { Container, Input, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';
import { getUsers } from '../redux/actions/userActions';
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            messages: [], // To store chat messages
            currentMessage: '', // To store the current input message
        };

        // Create a ref for the chat box
        this.chatBoxRef = React.createRef();
        // Create a ref for the user list
        this.userListRef = React.createRef();
    }

    componentDidMount() {
        this.populateUserData();
        // Simulate receiving messages
        this.simulateIncomingMessages();
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    }

    handleInputChange = (event) => {
        this.setState({ currentMessage: event.target.value });
    }

    handleSendMessage = () => {
        if (this.state.currentMessage.trim()) {
            this.setState(prevState => ({
                messages: [...prevState.messages, { sender: 'You', text: prevState.currentMessage }],
                currentMessage: ''
            }), () => {
                this.scrollToBottom(); // Scroll to bottom after adding message
            });
        }
    }

    simulateIncomingMessages = () => {
        setInterval(() => {
            this.setState(prevState => ({
                messages: [...prevState.messages, { sender: 'Other', text: 'This is a simulated message' }]
            }), () => {
                this.scrollToBottom(); // Scroll to bottom after adding message
            });
        }, 5000);
    }

    scrollToBottom = () => {
        // Scroll to the bottom of the chat box
        this.chatBoxRef.current.scrollTop = this.chatBoxRef.current.scrollHeight;
    }

    renderUsersList(users) {
        const filteredUsers = users.filter(user =>
            user.userName.toLowerCase().includes(this.state.filter.toLowerCase())
        );

        return (
            <div
                ref={this.userListRef}
                style={{ maxHeight: '700px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}
            >
                <Input
                    type="text"
                    placeholder="Filter by user name"
                    value={this.state.filter}
                    onChange={this.handleFilterChange}
                    className="mb-3"
                />
                <ListGroup>
                    {filteredUsers.map(user => (
                        <ListGroupItem key={user.id}>
                            <span>{user.userName}</span> 
                            <br/>
                            <span>{user.id}</span>
                        </ListGroupItem>
                        
                    ))}
                </ListGroup>
            </div>
        );
    }

    renderMessages() {
        return (
            <div
                ref={this.chatBoxRef}
                style={{ height: '660px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}
            >
                {this.state.messages.map((message, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <strong>{message.sender}: </strong>{message.text}
                    </div>
                ))}
            </div>
        );
    }

    render() {
        const { users, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <h2>Users</h2>
                        {this.renderUsersList(users)}
                    </Col>
                    <Col md={9}>
                        <h2>Chat</h2>
                        {this.renderMessages()}
                        <div className="d-flex">
                            <Input
                                type="text"
                                placeholder="Type a message..."
                                value={this.state.currentMessage}
                                onChange={this.handleInputChange}
                                onKeyPress={event => event.key === 'Enter' && this.handleSendMessage()}
                                className="mr-2"
                            />
                            <Button color="primary" onClick={this.handleSendMessage}>Send</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    async populateUserData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');
        if (roles) {
            this.props.getUsers(token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }
}

const mapStateToProps = state => ({
    users: state.user.users,
    loading: state.user.loading,
    error: state.user.error
});

const mapDispatchToProps = {
    getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
