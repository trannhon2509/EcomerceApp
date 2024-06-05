import React, { useState, useEffect } from 'react';

const EditProductForm = ({ product = {}, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        productCategoryName: '',
        quantity: '',
        information: '',
        status: false,
        ...product
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            name: product.name || '',
            description: product.description || '',
            price: product.price || '',
            productCategoryName: product.productCategoryName || '',
            quantity: product.quantity || '',
            information: product.information || '',
            status: product.status || false
        }));
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    defaultValue={formData.description}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    defaultValue={formData.price}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Category</label>
                <input
                    type="text"
                    name="productCategoryName"
                    defaultValue={formData.productCategoryName}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    defaultValue={formData.quantity}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Information</label>
                <textarea
                    name="information"
                    defaultValue={formData.information}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Status</label>
                <input
                    type="checkbox"
                    name="status"
                    defaultChecked={formData.status}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </form>
    );
};

export default EditProductForm;
