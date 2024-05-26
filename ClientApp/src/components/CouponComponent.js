import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCoupons } from '../redux/actions/couponActions';
import authService from './api-authorization/AuthorizeService';
import { Table, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';

const CouponComponent = ({ coupons, loading, error, getCoupons }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [minDiscount, setMinDiscount] = useState('');
    const [maxDiscount, setMaxDiscount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const couponsPerPage = 5;

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

    const pageCount = Math.ceil(filteredCoupons.length / couponsPerPage);
    const offset = pageNumber * couponsPerPage;

    const currentPageData = filteredCoupons
        .slice(offset, offset + couponsPerPage)
        .map(coupon => (
            <tr key={coupon.id}>
                <td>{coupon.code}</td>
                <td>{coupon.discountAmount}</td>
                <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td>{coupon.status ? 'Active' : 'Inactive'}</td>
            </tr>
        ));

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <h2>Coupons</h2>
            <Form className="mb-3">
                {/* Form inputs as before */}
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
                    {currentPageData}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
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
