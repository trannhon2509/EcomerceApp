import React, { Component } from 'react';
import { Container, Table, Input } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';
import { getUsers } from '../redux/actions/userActions';
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        };
    }

    componentDidMount() {
        this.populateUserData();
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    }

    renderUsersTable(users) {
        const filteredUsers = users.filter(user =>
            user.userName.toLowerCase().includes(this.state.filter.toLowerCase())
        );

        return (
            <React.Fragment>
                <Input
                    type="text"
                    placeholder="Filter by user name"
                    value={this.state.filter}
                    onChange={this.handleFilterChange}
                />
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

    render() {
        const { users, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        return (
            <Container fluid>
                <h2>Users</h2>
                {this.renderUsersTable(users)}
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
