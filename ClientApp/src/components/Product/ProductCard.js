import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RoutePath from "../../routes/RoutePath";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast

import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
const ProductCard = ({ name, price, imageUrl, productId, maxQuantity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = async () => {
    try {
      await axios.post(`api/shop/${productId}`);
      toast.success( name +' added to cart successfully!');
      // Optionally, you can show a success message or update UI to reflect the item being added to the cart.
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error('Failed to add item to cart!');
      // Handle error appropriately, such as displaying an error message.
    }
  };

  return (
    <div
      className="col-md-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
          <ToastContainer /> {/* Add ToastContainer here */}
      <div
        className="card"
        style={{ position: "relative", minHeight: "373px" }}
      >
        <div className="ccc" style={{ position: "relative" }}>
          <p className="text-center">
            <img
              src={imageUrl}
              className="imw mt-5"
              style={{
                minHeight: "270px",
                padding: "5px",
                boxSizing: "content-box",
              }}
              alt={name}
            />
          </p>
          {isHovered && (
            <div
              className="hover-icons"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <Link
                to={`${RoutePath.PRODUCTINFO.replace(":productId", productId)}`}
                className="text-decoration-none mr-2"
              >
                <i className="bi bi-info-circle"></i>
              </Link>
              <i
                className={`bi ${
                  isLiked
                    ? "bi-heart-fill text-danger"
                    : "bi-heart-fill text-warning"
                }`}
                onClick={() => setIsLiked(!isLiked)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          )}
        </div>
        <div className="card-body" style={{ height: "80px" }}>
          {isHovered ? (
            <button
              className="btn btn-danger w-100"
              style={{ height: "40px" }}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          ) : (
            <>
              <h5 className="text-center">{name}</h5>
              <p className="text-center">Price: {price}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
