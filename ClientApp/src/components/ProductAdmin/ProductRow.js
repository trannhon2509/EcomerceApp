import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ProductRow = ({ product, onDelete, onEdit, loadingDelete, onUpdateStatus, loadingUpdate, status }) => {
    const { id, name, description, price, productCategoryName, comments, images } = product;
    const [showImageList, setShowImageList] = useState(false);

    const toggleImageList = () => {
        setShowImageList(prevState => !prevState);
    };

    const handleStatusUpdate = () => {
        const newStatus = !product.status; // Đảo ngược trạng thái hiện tại (true -> false, false -> true)
        onUpdateStatus(product.id, newStatus);
    };

    return (
        <tr>
            <td>
                <div className="image-gallery">
                    {showImageList ? (
                        <ul>
                            {/*{images.map(image => (*/}
                            {images.filter(image => image.productId === product.productId).map(image => (
                                <li key={image.id}>
                                    <img src={image.imageUrl} alt={name} style={{ width: '100px' }} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <img
                                /*src={images[0].imageUrl}*/
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
            <td>{description}</td>
            <td>{price}</td>
            <td>{productCategoryName}</td>
            <td>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>{comment.content} (by {comment.user.userName})</li>
                    ))}
                </ul>
            </td>
            <td>{status ? 'Active' : 'Inactive'}</td>
            <td>
                <Button variant="warning" onClick={() => onEdit(product)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>
                {' '}
                <Button
                    variant={product.status ? 'danger' : 'success'} // Màu sắc button tùy thuộc vào trạng thái
                    onClick={handleStatusUpdate}
                    disabled={loadingUpdate}
                >
                    {product.status ? 'Deactivate' : 'Activate'}
                </Button>
            </td>
        </tr>
    );
};

export default ProductRow;
