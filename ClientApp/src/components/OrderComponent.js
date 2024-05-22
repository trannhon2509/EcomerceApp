import React, { Component } from 'react';
import { Container, Table, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getOrders } from '../redux/actions/orderActions';
import { getOrderDetails } from '../redux/actions/orderDetailActions'; // Import getOrderDetails action
import authService from './api-authorization/AuthorizeService';
import '../assets/css/OrderComponent.css';

function formatNumber(number) {
    // Kiểm tra xem number có phải là số không
    if (isNaN(number)) {
        return '';
    }

    // Làm tròn đến 2 chữ số thập phân
    const roundedNumber = Math.round(number * 100) / 100;

    // Chuyển đổi số thành chuỗi và tách thành các phần nguyên và phần thập phân
    const parts = roundedNumber.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Thêm dấu cách phân tách hàng nghìn
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Trả về số đã được định dạng
    return integerPart + decimalPart;
}

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedNote: null,
            selectedOrderId: null, // Track the selected order ID for order details
            detailsModalOpen: false // Track the state of the order details modal
        };
    }

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

    renderOrderDetailsTable = (orderDetails) => {
        // Tính tổng số lượng và tổng giá trị đơn hàng
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
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map(detail => (
                            <tr key={detail.id}>
                                <td>{detail.productId}</td>
                                <td>{detail.quantity}</td>
                                <td>{formatNumber(detail.unitPrice)}</td>
                                {/* Add more columns as needed */}
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
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Order Date</th>
                        <th>Coupon Id</th>
                        <th>Status</th>
                        <th>Note</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} onClick={() => this.toggleDetailsModal(order.id)}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.couponId == null ? "N/A" : order.couponId}</td>
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
                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const { orders, loading, error, orderDetails, detailsLoading } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <Container fluid>
                <h2>Orders</h2>
                {this.renderOrdersTable(orders)}
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

    async componentDidMount() {
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
