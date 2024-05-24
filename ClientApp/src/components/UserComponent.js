import React, { Component } from 'react';
import { Container, Table, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';
import { getUsers } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class UserComponent extends Component {
    state = {
        searchQuery: '',
        addresses: {},
        modalOpen: false,
        modalAddresses: [],
        currentPage: 0,
        usersPerPage: 6
    };

    componentDidMount() {
        this.populateUserData();
    }

    handleSearchChange = (e) => {
        this.setState({
            searchQuery: e.target.value,
            currentPage: 0 // Reset to first page on search
        });
    };

    async getAddressByUserId(userId) {
        try {
            const response = await axios.get(`/api/addresses/GetAddressesByUserId/${userId}`);
            const address = response.data;
            this.setState(prevState => ({
                addresses: { ...prevState.addresses, [userId]: address }
            }));
        } catch (error) {
            console.error('Error fetching user address:', error);
        }
    }

    async populateUserData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');
        if (roles) {
            await this.props.getUsers(token);
            this.fetchAddressesForUsers(this.props.users);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }

    fetchAddressesForUsers(users) {
        users.forEach(user => {
            this.getAddressByUserId(user.id);
        });
    }

    renderAddresses(addresses) {
        if (!addresses || addresses.length === 0) {
            return 'N/A';
        }

        if (addresses.length > 3) {
            return (
                <div>
                    {addresses.slice(0, 2).map(address => (
                        <div key={address.id}>
                            {address.street}, {address.city}, {address.state}, {address.zipCode}
                            {address.isDefault && ' (Default)'}
                        </div>
                    ))}
                    <div onClick={() => this.showAllAddresses(addresses)} style={{ color: 'blue', cursor: 'pointer' }}>
                        view more...
                    </div>
                </div>
            );
        }

        return addresses.map(address => (
            <div key={address.id}>
                {address.street}, {address.city}, {address.state}, {address.zipCode}
                {address.isDefault && ' (Default)'}
            </div>
        ));
    }

    showAllAddresses = (addresses) => {
        this.setState({
            modalOpen: true,
            modalAddresses: addresses
        });
    };

    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    };

    renderUsersTable(users) {
        const { searchQuery, addresses, currentPage, usersPerPage } = this.state;
        const filteredUsers = users.filter(user =>
            user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.phoneNumber && user.phoneNumber.includes(searchQuery))
        );

        const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
        const offset = currentPage * usersPerPage;
        const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

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
                            <th>Address</th>
                            <th>Email</th>
                            <th>Email Confirmed</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <td><img src={user.imgUrl} width={80} alt="Avatar" /></td>
                                <td>{user.userName}</td>
                                <td>
                                    {this.renderAddresses(addresses[user.id])}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.emailConfirmed ? 'Yes' : 'No'}</td>
                                <td>{user.phoneNumber || 'N/A'}</td>
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
        const { users, loading, error } = this.props;
        const { modalOpen, modalAddresses } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <h2>Users</h2>
                {this.renderUsersTable(users)}

                <Modal isOpen={modalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Addresses</ModalHeader>
                    <ModalBody>
                        {modalAddresses.map(address => (
                            <div key={address.id}>
                                {address.street}, {address.city}, {address.state}, {address.zipCode}
                                {address.isDefault && ' (Default)'}
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
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
