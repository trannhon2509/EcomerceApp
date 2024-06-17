import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        productCategoryName: '',
        status: false,
        images: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        const newProduct = {
            ...formData,
            images: formData.images.split(',') // convert images to an array
        };
        onSave(newProduct);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
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

export default AddProductModal;
