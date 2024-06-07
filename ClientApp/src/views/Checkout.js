import React, { useEffect, useState } from 'react'
import '../assets/css/Checkout.css'
import axios from 'axios';
import RoutePath from '../routes/RoutePath';
import { Link } from 'react-router-dom';
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0); // Khởi tạo discount là null

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('api/shop');
        setCartItems(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);

  // Function to handle applying coupon
  const applyCoupon = async () => {
    try {
      const response = await axios.get(`api/Coupons/search?code=${couponCode}`);
      if (response.data) {
        // Coupon found, update the discount
        setDiscount(response.data);
        console.log(response.data)
      } else {
        // Coupon not found or invalid, display an error message to the user
        setDiscount(0);
        alert('Invalid coupon code');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Function to calculate total price after applying discount
  const calculateTotalAfterDiscount = () => {
    let total = calculateTotal();
    if (discount != 0) {
      total = (total * discount.discountAmount) / 100;
    }
    return total;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8">
          <div className="card bg-light">
            <div className="card-body">
              <ol className="activity-checkout mb-0 px-4 mt-3">
                <li className="checkout-item">
                  <div className="avatar checkout-icon p-1">
                    <div className="avatar-title rounded-circle bg-primary">
                      <i className="bx bxs-receipt text-white font-size-20" />
                    </div>
                  </div>
                  <div className="feed-item-list">
                    <div>
                      <h5 className="font-size-16 mb-1">Thông tin đơn hàng</h5>
                      <p className="text-muted text-truncate mb-4">Điền thông tin khách hàng</p>
                      <div className="mb-3">
                        <form>
                          <div>
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-name">Tên</label>
                                  <input type="text" className="form-control" id="billing-name" placeholder="Nhập tên của bạn" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-email-address">Email</label>
                                  <input type="email" className="form-control" id="billing-email-address" placeholder="Nhập mail" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="billing-phone">Số điện thoại</label>
                                  <input type="text" className="form-control" id="billing-phone" placeholder="Nhập số điện thoại" />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="billing-address">Địa chỉ</label>
                              <textarea className="form-control" id="billing-address" rows={3} placeholder="Nhập địa chỉ ..." defaultValue={""} />
                            </div>
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="mb-4 mb-lg-0">
                                  <label className="form-label">Tỉnh/Thành phố</label>
                                  <select className="form-control form-select" title="Country">
                                    <option value={0}>Chọn tỉnh/thành phố</option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AS">American Samoa</option>
                                    <option value="AD">Andorra</option>
                                    <option value="AO">Angola</option>
                                    <option value="AI">Anguilla</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-4 mb-lg-0">
                                  <label className="form-label" htmlFor="billing-city">Huyện/Quận</label>
                                  <input type="text" className="form-control" id="billing-city" placeholder="Nhập tên huyện" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="mb-0">
                                  <label className="form-label" htmlFor="zip-code">Xã/Thị trấn
                                    code</label>
                                  <input type="text" className="form-control" id="zip-code" placeholder="Nhập tên xã/thị trấn" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="checkout-item">
                  <div className="avatar checkout-icon p-1">
                    <div className="avatar-title rounded-circle bg-primary">
                      <i className="bx bxs-truck text-white font-size-20" />
                    </div>
                  </div>
                  <div className="feed-item-list">
                    <div>
                      <h5 className="font-size-16 mb-1">Thông tin vận chuyển</h5>
                      <p className="text-muted text-truncate mb-4">Chọn địa chỉ của bạn</p>
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-lg-4 col-sm-6">
                            <div data-bs-toggle="collapse">
                              <label className="card-radio-label mb-0">
                                <input type="radio" name="address" id="info-address1" className="card-radio-input" defaultChecked />
                                <div className="card-radio text-truncate p-3">
                                  <span className="fs-14 mb-4 d-block">Address 1</span>
                                  <span className="fs-14 mb-2 d-block">Bradley
                                    McMillian</span>
                                  <span className="text-muted fw-normal text-wrap mb-1 d-block">109
                                    Clarksburg Park Road Show Low, AZ 85901</span>
                                  <span className="text-muted fw-normal d-block">Mo.
                                    012-345-6789</span>
                                </div>
                              </label>
                              <div className="edit-btn bg-light  rounded">
                                <a href="#" data-bs-toggle="tooltip" data-placement="top" title data-bs-original-title="Edit">
                                  <i className="bx bx-pencil font-size-16" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6">
                            <div>
                              <label className="card-radio-label mb-0">
                                <input type="radio" name="address" id="info-address2" className="card-radio-input" />
                                <div className="card-radio text-truncate p-3">
                                  <span className="fs-14 mb-4 d-block">Address 2</span>
                                  <span className="fs-14 mb-2 d-block">Bradley
                                    McMillian</span>
                                  <span className="text-muted fw-normal text-wrap mb-1 d-block">109
                                    Clarksburg Park Road Show Low, AZ 85901</span>
                                  <span className="text-muted fw-normal d-block">Mo.
                                    012-345-6789</span>
                                </div>
                              </label>
                              <div className="edit-btn bg-light  rounded">
                                <a href="#" data-bs-toggle="tooltip" data-placement="top" title data-bs-original-title="Edit">
                                  <i className="bx bx-pencil font-size-16" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="checkout-item">
                  <div className="avatar checkout-icon p-1">
                    <div className="avatar-title rounded-circle bg-primary">
                      <i className="bx bxs-wallet-alt text-white font-size-20" />
                    </div>
                  </div>
                  <div className="feed-item-list">
                    <div>
                      <h5 className="font-size-16 mb-1">Thông tin thanh toán</h5>
                      <p className="text-muted text-truncate mb-4">Chọn phương thức thanh toán</p>
                    </div>
                    <div>
                      <h5 className="font-size-14 mb-3">Phương thức thanh toán:</h5>
                      <div className="row">
                        <div className="col-lg-3 col-sm-6">
                          <div data-bs-toggle="collapse">
                            <label className="card-radio-label">
                              <input type="radio" name="pay-method" id="pay-methodoption1" className="card-radio-input" />
                              <span className="card-radio py-3 text-center text-truncate">
                                <i className="bx bx-credit-card d-block h2 mb-3" />
                                Thẻ tín dụng
                              </span>
                            </label>
                          </div>
                        </div>
                       
                        <div className="col-lg-3 col-sm-6">
                          <div>
                            <label className="card-radio-label">
                              <input type="radio" name="pay-method" id="pay-methodoption3" className="card-radio-input" defaultChecked />
                              <span className="card-radio py-3 text-center text-truncate">
                                <i className="bx bx-money d-block h2 mb-3" />
                                <span>Momo</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
            <Link to={RoutePath.ProductPage}>
                <i className="mdi mdi-arrow-left me-1" /> Tiếp tục mua sắm
            </Link>
            </div>
            <div className="col">
              <div className="text-end mt-2 mt-sm-0">
                <a href="#" className="btn btn-success">
                  <i className="mdi mdi-cart-outline me-1" /> Tiến hành thanh toán </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card checkout-order-summary bg-light">
            <div className="card-body">
              {/* <div className="p-3 bg-light mb-3">
                <h5 className="font-size-16 mb-0">Order Summary <span className="float-end ms-2">#MN0124</span></h5>
              </div> */}
              <div className="table-responsive">
                <table className="table table-centered mb-0 table-nowrap">
                  <thead>
                    <tr>
                      <th className="border-top-0" style={{ width: 110 }} scope="col">Sản phẩm</th>
                      <th className="border-top-0" scope="col">Thông tin</th>
                      <th className="border-top-0" scope="col">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(
                      item => (
                        <tr key={item.productId}>
                          <th scope="row"><img src={item.imageUrl[0].imageUrl} alt="product-img" title="product-img" className="avatar-lg rounded" /></th>
                          <td>
                            <h5 className="font-size-16 text-truncate"><a href="#" className="text-dark">{item.name}</a></h5>
                            <p className="text-muted mb-0">
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star text-warning" />
                              <i className="bx bxs-star-half text-warning" />
                            </p>
                            <p className="text-muted mb-0 mt-1">{item.price} {"VNĐ"} x {item.quantity}</p>
                          </td>
                          <td> {(item.quantity * item.price).toFixed(0)} VNĐ</td>
                        </tr>
                      )

                    )}

                    <tr>
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Thành tiền :</h5>
                      </td>
                      <td>
                        {calculateTotal()} VNĐ
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Giảm giá :</h5>
                      </td>
                      <td>
                        {discount == 0 ? "0 %" : `${discount.discountAmount} %`}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Phí vận chuyển :</h5>
                      </td>
                      <td>
                        20,000 VNĐ
                      </td>
                    </tr>
                  
                    <tr className="bg-light">
                      <td colSpan={2}>
                        <h5 className="font-size-14 m-0">Tổng:</h5>
                      </td>
                      <td>
                        {calculateTotalAfterDiscount()} VNĐ
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-3">
                  <div className="d-flex justify-content-between">
                    <input type="text" className="form-input " id="coupon-code" placeholder="Nhập mã giảm giá" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                    <button className="sec-btn-custom mx-1 text-nowrap" type="button" onClick={applyCoupon}>Áp dụng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Checkout