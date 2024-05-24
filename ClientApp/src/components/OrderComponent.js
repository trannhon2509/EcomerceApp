import React, { Component } from 'react';
import { Container, Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, FormGroup, Label, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';
import { getOrders } from '../redux/actions/orderActions';
import { getOrderDetails } from '../redux/actions/orderDetailActions'; // Import getOrderDetails action
import authService from './api-authorization/AuthorizeService';
import axios from 'axios';
import '../assets/css/OrderComponent.css';

function formatNumber(number) {
    if (isNaN(number)) {
        return '';
    }

    const roundedNumber = Math.round(number * 100) / 100;
    const parts = roundedNumber.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return integerPart + decimalPart;
}

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedNote: null,
            selectedOrderId: null,
            detailsModalOpen: false,
            userNames: {},
            couponCodes: {}, // State to store coupon codes corresponding to coupon IDs
            searchQuery: '',
            filterStatus: '',
            startDate: '',
            endDate: '',
            currentPage: 1, // Current page
            itemsPerPage: 10 // Items per page
        };
    }

    componentDidMount() {
        this.populateOrderData();
    }

    async getUserName(userId) {
        if (!this.state.userNames[userId]) {
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
    }

    async fetchCouponCode(couponId) {
        if (!this.state.couponCodes[couponId]) {
            try {
                const response = await fetch(`/api/Coupons/${couponId}`);
                const coupon = await response.json();
                this.setState(prevState => ({
                    couponCodes: {
                        ...prevState.couponCodes,
                        [couponId]: coupon.code
                    }
                }));
            } catch (error) {
                console.error('Error fetching coupon code:', error);
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.orders !== this.props.orders) {
            this.props.orders.forEach(order => {
                if (!this.state.userNames[order.userId]) {
                    this.getUserName(order.userId);
                }
                if (order.couponId && !this.state.couponCodes[order.couponId]) {
                    this.fetchCouponCode(order.couponId);
                }
            });
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value, currentPage: 1 });
    };

    handleStatusChange = (event) => {
        this.setState({ filterStatus: event.target.value, currentPage: 1 });
    };

    handleStartDateChange = (event) => {
        this.setState({ startDate: event.target.value, currentPage: 1 });
    };

    handleEndDateChange = (event) => {
        this.setState({ endDate: event.target.value, currentPage: 1 });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    toggleExpandNote = (orderId) => {
        this.setState({
            expandedNote: orderId === this.state.expandedNote ? null : orderId
        });
    };

    toggleDetailsModal = (orderId) => {
        this.setState({
            selectedOrderId: orderId,
            detailsModalOpen: !this.state.detailsModalOpen
        });
        if (orderId && !this.state.detailsModalOpen) {
            this.populateOrderDetails(orderId);
        }
    };

    populateOrderDetails = async (orderId) => {
        const token = await authService.getAccessToken();
        this.props.getOrderDetails(orderId, token);
    };

    filterOrders = (orders) => {
        const { searchQuery, filterStatus, startDate, endDate } = this.state;
        return orders.filter(order => {
            const userName = this.state.userNames[order.userId] || '';
            const matchesSearchQuery = userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (order.couponId && this.state.couponCodes[order.couponId].toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesStatus = filterStatus ? order.status === filterStatus : true;
            const orderDate = new Date(order.orderDate);
            const matchesStartDate = startDate ? orderDate >= new Date(startDate) : true;
            const matchesEndDate = endDate ? orderDate <= new Date(endDate) : true;
            return matchesSearchQuery && matchesStatus && matchesStartDate && matchesEndDate;
        });
    };

    renderOrderDetailsTable = (orderDetails) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        orderDetails.forEach(detail => {
            totalQuantity += detail.quantity;
            totalPrice += detail.quantity * detail.unitPrice;
        });

        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map(detail => (
                            <tr key={detail.id}>
                                <td>{detail.productId}</td>
                                <td>{detail.quantity}</td>
                                <td>{formatNumber(detail.unitPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <p><strong>Total Quantity:</strong> {totalQuantity}</p>
                    <p><strong>Total Price:</strong> {formatNumber(totalPrice)}</p>
                </div>
            </React.Fragment>
        );
    };

    renderOrdersTable(orders) {
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastOrder = currentPage * itemsPerPage;
        const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
        const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

        const totalPages = Math.ceil(orders.length / itemsPerPage);

        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Order Date</th>
                            <th>Coupon Code</th>
                            <th>Status</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.id} onClick={() => this.toggleDetailsModal(order.id)}>
                                <td>{order.id}</td>
                                <td>{this.state.userNames[order.userId] || 'Loading...'}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.couponId ? (this.state.couponCodes[order.couponId] || 'Loading...') : 'N/A'}</td>
                                <td>{order.status}</td>
                                <td>
                                    {order.note.length > 30 ? (
                                        <span>
                                            {order.note.substring(0, 30)}...
                                            <Button color="link" onClick={(e) => { e.stopPropagation(); this.toggleExpandNote(order.id); }}>
                                                {this.state.expandedNote === order.id ? "Collapse" : "Read more"}
                                            </Button>
                                        </span>
                                    ) : (
                                        order.note
                                    )}

                                    <Modal isOpen={this.state.expandedNote === order.id} toggle={() => this.toggleExpandNote(order.id)}>
                                        <ModalHeader toggle={() => this.toggleExpandNote(order.id)}>Order Note</ModalHeader>
                                        <ModalBody className="modal-body-content">
                                            {order.note}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={() => this.toggleExpandNote(order.id)}>Close</Button>
                                        </ModalFooter>
                                    </Modal>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    <PaginationItem disabled={currentPage <= 1}>
                        <PaginationLink
                            previous
                            onClick={() => this.handlePageChange(currentPage - 1)}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((page, i) => (
                        <PaginationItem active={i + 1 === currentPage} key={i}>
                            <PaginationLink onClick={() => this.handlePageChange(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage >= totalPages}>
                        <PaginationLink
                            next
                            onClick={() => this.handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                </Pagination>
            </React.Fragment>
        );
    }

    render() {
        const { orders, loading, error, orderDetails, detailsLoading } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        const filteredOrders = this.filterOrders(orders);

        return (
            <Container fluid>
                <h2>Orders</h2>
                <Form className="mb-3">
                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="searchQuery">Search</Label>
                                <Input
                                    type="text"
                                    name="search"
                                    id="searchQuery"
                                    placeholder="Search by username or coupon code"
                                    value={this.state.searchQuery}
                                    onChange={this.handleSearchChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="filterStatus">Status</Label>
                                <Input
                                    type="select"
                                    name="status"
                                    id="filterStatus"
                                    value={this.state.filterStatus}
                                    onChange={this.handleStatusChange}
                                >
                                    <option value="">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
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
                            <Button type="button" onClick={() => this.setState({ searchQuery: '', filterStatus: '', startDate: '', endDate: '', currentPage: 1 })} className="mt-2">Reset</Button>
                        </Col>
                    </Row>
                </Form>
                {this.renderOrdersTable(filteredOrders)}
                <Modal isOpen={this.state.detailsModalOpen} toggle={() => this.toggleDetailsModal(null)}>
                    <ModalHeader toggle={() => this.toggleDetailsModal(null)}>Order Details</ModalHeader>
                    <ModalBody>
                        {detailsLoading ? <p>Loading...</p> : this.renderOrderDetailsTable(orderDetails)}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggleDetailsModal(null)}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }

    async populateOrderData() {
        const token = await authService.getAccessToken();
        const roles = await authService.isinRole('Admin');

        if (roles) {
            this.props.getOrders(token);
        } else {
            window.location.href = '/Identity/Account/AccessDenied';
        }
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    orderDetails: state.orderDetail.orderDetails,
    detailsLoading: state.orderDetail.loading
});

const mapDispatchToProps = {
    getOrders,
    getOrderDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
