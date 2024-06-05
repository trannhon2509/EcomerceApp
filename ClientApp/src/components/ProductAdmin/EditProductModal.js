import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const EditProductModal = ({ isOpen, toggle, product, categories, onSave }) => {
    const [editedProduct, setEditedProduct] = useState(product);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find(cat => cat.id === categoryId);
        setEditedProduct({ ...editedProduct, productCategoryId: categoryId, productCategoryName: category.name });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProduct);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="productName">Name</Label>
                        <Input type="text" name="name" id="productName" value={editedProduct.name} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productDescription">Description</Label>
                        <Input type="textarea" name="description" id="productDescription" value={editedProduct.description} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productPrice">Price</Label>
                        <Input type="number" name="price" id="productPrice" value={editedProduct.price} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productQuantity">Quantity</Label>
                        <Input type="number" name="quantity" id="productQuantity" value={editedProduct.quantity} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productCategory">Category</Label>
                        <Input type="select" name="productCategory" id="productCategory" value={editedProduct.productCategoryId} onChange={handleCategoryChange}>
                            <option value="">Select Category</option>
                            {categories && categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditProductModal;
