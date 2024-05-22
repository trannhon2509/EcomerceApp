import React, { Component } from 'react';
import { Container, Table, Input } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';
import { getUsers } from '../redux/actions/userActions';
import { connect } from 'react-redux';

class UserComponent extends Component {
    state = {
        searchQuery: ''
    };

    componentDidMount() {
        this.populateUserData();
    }

    handleSearchChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    renderUsersTable(users) {
        const { searchQuery } = this.state;
        const filteredUsers = users.filter(user =>
            user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.phoneNumber && user.phoneNumber.includes(searchQuery))
        );

        return (
            <React.Fragment>
                <Input
                    type="text"
                    placeholder="Search by username, email or phone number"
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                    style={{ marginBottom: '10px' }}
                />
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Email Confirmed</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td><img src={user.imgUrl} width={80} alt="Avatar" /></td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.emailConfirmed ? 'Yes' : 'No'}</td>
                                <td>{user.phoneNumber || 'N/A'}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
