import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCoupons } from '../redux/actions/couponActions';
import authService from './api-authorization/AuthorizeService';
import { Table, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';

const CouponComponent = ({ coupons, loading, error, getCoupons }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [minDiscount, setMinDiscount] = useState('');
    const [maxDiscount, setMaxDiscount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const fetchCoupons = async () => {
            const token = await authService.getAccessToken();
            getCoupons(token);
        };
        fetchCoupons();
    }, [getCoupons]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleMinDiscountChange = (e) => setMinDiscount(e.target.value);
    const handleMaxDiscountChange = (e) => setMaxDiscount(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleStatusChange = (e) => setFilterStatus(e.target.value);

    const filterCoupons = () => {
        return coupons.filter(coupon => {
            const matchesSearchQuery = coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesMinDiscount = minDiscount ? coupon.discountAmount >= parseFloat(minDiscount) : true;
            const matchesMaxDiscount = maxDiscount ? coupon.discountAmount <= parseFloat(maxDiscount) : true;
            const couponExpiryDate = new Date(coupon.expiryDate);
            const matchesStartDate = startDate ? couponExpiryDate >= new Date(startDate) : true;
            const matchesEndDate = endDate ? couponExpiryDate <= new Date(endDate) : true;
            const matchesStatus = filterStatus ? (filterStatus === 'Active' ? coupon.status : !coupon.status) : true;

            return matchesSearchQuery && matchesMinDiscount && matchesMaxDiscount && matchesStartDate && matchesEndDate && matchesStatus;
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredCoupons = filterCoupons();

    return (
        <div>
            <h2>Coupons</h2>
            <Form className="mb-3">
                <Row form>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="searchQuery">Search</Label>
                            <Input
                                type="text"
                                name="search"
                                id="searchQuery"
                                placeholder="Search by code"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="minDiscount">Min Discount</Label>
                            <Input
                                type="number"
                                name="minDiscount"
                                id="minDiscount"
                                placeholder="Min discount"
                                value={minDiscount}
                                onChange={handleMinDiscountChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="maxDiscount">Max Discount</Label>
                            <Input
                                type="number"
                                name="maxDiscount"
                                id="maxDiscount"
                                placeholder="Max discount"
                                value={maxDiscount}
                                onChange={handleMaxDiscountChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="startDate">Start Date</Label>
                            <Input
                                type="date"
                                name="startDate"
                                id="startDate"
                                value={startDate}
                                onChange={handleStartDateChange}
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
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={1}>
                        <FormGroup>
                            <Label for="filterStatus">Status</Label>
                            <Input
                                type="select"
                                name="status"
                                id="filterStatus"
                                value={filterStatus}
                                onChange={handleStatusChange}
                            >
                                <option value="">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={1} className="align-self-center">
                        <Button type="button" onClick={() => {
                            setSearchQuery('');
                            setMinDiscount('');
                            setMaxDiscount('');
                            setStartDate('');
                            setEndDate('');
                            setFilterStatus('');
                        }} className="mt-2">Reset</Button>
                    </Col>
                </Row>
            </Form>
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount Amount</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCoupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td>{coupon.code}</td>
                            <td>{coupon.discountAmount}</td>
                            <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                            <td>{coupon.status ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

const mapStateToProps = state => ({
    coupons: state.coupon.coupons,
    loading: state.coupon.loading,
    error: state.coupon.error
});

const mapDispatchToProps = {
    getCoupons
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponComponent);
