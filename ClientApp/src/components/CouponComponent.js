// components/CouponComponent.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoupons } from '../redux/actions/couponActions';
import authService from './api-authorization/AuthorizeService';
import { Table } from 'reactstrap'; // Import Table component from reactstrap

const CouponComponent = ({ coupons, loading, error, getCoupons }) => {
    useEffect(() => {
        const fetchCoupons = async () => {
            const token = await authService.getAccessToken();
            getCoupons(token);
        };
        fetchCoupons();
    }, [getCoupons]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Coupons</h2>
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Discount Amount</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id}>
                            <td>{coupon.id}</td>
                            <td>{coupon.code}</td>
                            <td>{coupon.discountAmount}</td>
                            <td>{coupon.expiryDate}</td>
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
