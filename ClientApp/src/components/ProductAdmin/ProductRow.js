import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; // Assuming you have Modal component from react-bootstrap
import "../../assets/css/ProductComponent.css"
const ProductRow = ({ product, onDelete, onEdit, loadingDelete, onUpdateStatus, loadingUpdate, status }) => {
    const { id, name, description, price, productCategoryName, comments, images } = product;
    const [showImageList, setShowImageList] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const toggleImageList = () => {
        setShowImageList(prevState => !prevState);
    };

    const handleStatusUpdate = () => {
        const newStatus = !product.status;
        onUpdateStatus(product.id, newStatus);
    };

    const truncateDescription = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <tr>
            <td>
                <div className="image-gallery">
                    {showImageList ? (
                        <ul>
                            {images.filter(image => image.productId === product.productId).map(image => (
                                <li key={image.id}>
                                    <img src={image.imageUrl} alt={name} style={{ width: '100px' }} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <img
                            src={images.find(image => image.productId === product.productId)?.imageUrl || ""}
                            alt={name}
                            style={{ width: '100px' }}
                        />
                    )}
                </div>
                {images.length > 1 && (
                    <button onClick={toggleImageList}>
                        {showImageList ? 'Hide Images' : 'Show Images'}
                    </button>
                )}
            </td>
            <td>{name}</td>
            <td>{truncateDescription(description, 100)}</td>
            <td>{price}</td>
            <td>{productCategoryName}</td>
            <td>
                <ul>
                    {comments.slice(0, 2).map(comment => ( // Limit to display only 2 comments
                        <li key={comment.id}>{comment.content} (by {comment.user.userName})</li>
                    ))}
                   
                </ul>
            </td>
            <td>{status ? 'Active' : 'Inactive'}</td>
            <td>
                <Button variant="warning" onClick={() => onEdit(product)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>{' '}
                <Button
                    variant={product.status ? 'danger' : 'success'}
                    onClick={handleStatusUpdate}
                    disabled={loadingUpdate}
                >
                    {product.status ? 'Deactivate' : 'Activate'}
                </Button>{' '}
                <Button variant="primary" onClick={toggleModal}>Detail</Button>
            </td>

            {/* Modal for detailed product view */}
            <Modal show={showModal} onHide={toggleModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Price:</strong> {price}</p>
                    <p><strong>Category:</strong> {productCategoryName}</p>
                    <p><strong>Status:</strong> {status ? 'Active' : 'Inactive'}</p>
                    <h5>Comments:</h5>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>{comment.content} (by {comment.user.userName})</li>
                        ))}
                    </ul>
                    <h5>Images:</h5>
                    <ul className="d-flex">
                        {images.map(image => (
                            <li key={image.id}>
                                <img src={image.imageUrl} alt={name} style={{ width: '100px' }} />
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </tr>
    );
};

export default ProductRow;
