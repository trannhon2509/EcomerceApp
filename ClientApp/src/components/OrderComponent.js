import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import authService from './api-authorization/AuthorizeService';

const OrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdminRole();
    }, [currentPage]);

    useEffect(() => {
        if (isAdmin) {
            fetchOrders();
        }
    }, [isAdmin, currentPage]);

    const fetchOrders = async () => {
        try {
            const token = await authService.getAccessToken();
            const response = await axios.get('/api/Orders', {
                params: {
                    page: currentPage + 1,
                    pageSize: 10
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data.results);
            setTotalPages(response.data.totalPages);
            console.log(typeof response.data.results.coupon)
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const checkAdminRole = async () => {
        try {
            const isAdmin = await authService.isinRole('Admin');
            setIsAdmin(isAdmin);
            if (!isAdmin) {
                window.location.href = '/Identity/Account/AccessDenied';
            }
        } catch (error) {
            console.error('Error checking admin role:', error);
        }
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const handleShowDetails = async (order) => {
        try {
            const token = await authService.getAccessToken();
            const response = await axios.get(`/api/Orders/${order.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSelectedOrder(response.data);
            setOrderDetails(response.data.OrderDetails);
            setShowDetailsModal(true);
            console.log(response.data.OrderDetails)
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleCloseDetailsModal = () => {
        setSelectedOrder(null);
        setOrderDetails([]);
        setShowDetailsModal(false);
    };

    return (
        <div>
            <h2>Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>OrderDate</th>
                        <th>CouponCode</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map (order =>  (
                        <tr key={order.id}>
                            <td>{order.user.userName}</td>
                            <td>{order.orderDate}</td>
                            <td>CouponCode dang test</td>
                            {/*<td>{order.coupon.code}</td>*/}
                            <td style={{
                                maxWidth: '200px',
                                overflowWrap: 'break-word'
                            }}>{order.note && order.note.length > 100 ? order.note.slice(0, 50) + '...' : order.note}</td>
                            <td>{order.status}</td>
                            <td>
                                <Button color="info" onClick={() => handleShowDetails(order)}>Show Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLinkClassName="page-link"
            />

            {/* Details Modal */}
            <Modal isOpen={showDetailsModal} toggle={handleCloseDetailsModal}>
                <ModalHeader toggle={handleCloseDetailsModal}>Order Details</ModalHeader>
                <ModalBody>
                    <h4>Order Information:</h4>
                    <p>User Name: {selectedOrder && selectedOrder.User && selectedOrder.User.UserName}</p>
                    <p>Order Date: {selectedOrder && selectedOrder.OrderDate}</p>
                    <p>Coupon Name: {selectedOrder && selectedOrder.Coupon && selectedOrder.Coupon.Code}</p>
                    <p>Note: {selectedOrder && selectedOrder.note}</p>
                    <p>Status: {selectedOrder && selectedOrder.Status}</p>
                    <hr />
                    <h4>Order Details:</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map(orderDetail => (
                                <tr key={orderDetail.id}>
                                    <td>{orderDetail.Product}</td>
                                    <td>{orderDetail.Quantity}</td>
                                    <td>{orderDetail.UnitPrice}</td>
                                    <td>{orderDetail.Quantity * orderDetail.UnitPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCloseDetailsModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default OrderComponent;
