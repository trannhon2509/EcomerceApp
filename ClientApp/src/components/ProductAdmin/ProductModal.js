import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ show, onHide, onSave, product }) => {
    const [formData, setFormData] = useState({
        id: product ? product.id : '',
        name: product ? product.name : '',
        description: product ? product.description : '',
        price: product ? product.price : '',
        productCategoryName: product ? product.productCategoryName : '',
        status: product ? product.status : false,
        images: product ? product.images.map(image => image.imageUrl).join(',') : '' // join images into a string
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                productCategoryName: product.productCategoryName,
                status: product.status,
                images: product.images.map(image => image.imageUrl).join(',') // join images into a string
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        const updatedProduct = {
            ...formData,
            images: formData.images.split(',') // convert images back to an array
        };
        onSave(updatedProduct);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategoryName">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="productCategoryName"
                            value={formData.productCategoryName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                        <Form.Check
                            type="checkbox"
                            name="status"
                            label="Active"
                            checked={formData.status}
                            onChange={() => setFormData(prevState => ({ ...prevState, status: !prevState.status }))}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImages">
                        <Form.Label>Images (separated by comma)</Form.Label>
                        <Form.Control
                            type="text"
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;
