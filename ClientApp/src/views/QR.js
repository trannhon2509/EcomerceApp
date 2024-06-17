import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Checkout.js';

const QR = () => {
    const [isPaid, setIsPaid] = useState(false);
    const { total } = useParams();

    // Example data
    const bankId = 'MBBank';
    const accountNo = '0399918513';
    const template = 'compact2';
    const description = 'Vui lòng kiểm tra thông tin trước khi thanh toán';
    const accountName = 'Trần Văn Tuấn';

    // Generate QR code URL based on provided data
    const generateQuickLinkUrl = (bankId, accountNo, template, total, description, accountName) => {
        const encodedDescription = encodeURIComponent(description);
        const encodedAccountName = encodeURIComponent(accountName);
        return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${total}&addInfo=${encodedDescription}&accountName=${encodedAccountName}`;
    };

    const quickLinkUrl = generateQuickLinkUrl(bankId, accountNo, template, total, description, accountName);

    // Handle payment confirmation
    const handlePayment = () => {
        // Simulate payment success
        setIsPaid(true);
    };

    return (
        <div className="checkout-container">
            {!isPaid ? (
                <div>
                    <h2>Thông tin thanh toán</h2>
                    <p>Số tiền cần thanh toán: {total} VNĐ</p>
                    <p>Mô tả: {description}</p>
                    <p>Tên tài khoản: {accountName}</p>
                    <img src={quickLinkUrl} alt="QR Code" />
                    <button className="btn btn-success" onClick={handlePayment}>
                        Xác nhận thanh toán
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Thanh toán thành công!</h2>
                    <p>Cảm ơn bạn đã thanh toán thành công.</p>
                    {/* You can add a button or link here to redirect to another page */}
                </div>
            )}
        </div>
    );
};

export default QR;
