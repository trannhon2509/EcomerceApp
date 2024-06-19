import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Pagination, Table } from 'react-bootstrap';

const ProductCrudComponent = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 1, // You can set default values here
        information: '',
        status: true,
        productCategoryId: 1
    });
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product
    const pageSize = 10;

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/Products?page=${currentPage}&pageSize=${pageSize}`);
            setProducts(response.data.results);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null); // Clear selected product
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCreateProduct = async () => {
        try {
            const productData = {
                product,
                images: images.map(url => ({ imageUrl: url }))
            };

            const response = await axios.post('/api/Products', productData);
            console.log('Product created:', response.data);

            handleCloseModal();
            fetchProducts(); // Reload products after creation
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <Button variant="primary" onClick={() => handleShowModal()}>
                Create Product
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <div>
                            <h4>{selectedProduct.name}</h4>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                            <p><strong>Price:</strong> ${selectedProduct.price}</p>
                            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                            <p><strong>Category:</strong> {selectedProduct.productCategoryName}</p>
                            <p><strong>Status:</strong> {selectedProduct.status ? "Deactive" : "Active"}</p>
                            <p><strong>Information:</strong> {selectedProduct.product.information}</p>
                            <div className="d-flex justify-content-center">
                                {selectedProduct.images.map((image, index) => (
                                    <img key={index} src={image.imageUrl} alt={`Product ${index}`} style={{ width: '100px', margin: '10px' }} />
                                ))}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.images[0]?.imageUrl} alt={`Product ${product.id}`} style={{ width: '100px' }} />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.productCategoryName}</td>
                                <td>{product.status ? "Deactive" : "Active"}</td>
                                <td className="d-flex flex-column gap-2">
                                    <Button variant="warning" onClick={() => handleShowModal(product)}>
                                        Edit
                                    </Button>

                                    <Button variant="danger" onClick={() => handleShowModal(product)}>
                                        Delete
                                    </Button>

                                    <Button variant="success" onClick={() => handleShowModal(product)}>
                                        Active
                                    </Button>

                                    <Button variant="info" onClick={() => handleShowModal(product)}>
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Pagination className="mt-3">
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default ProductCrudComponent;
