import React, { useState } from 'react';

const ProductRow = ({ product, onDelete, onEdit, loadingDelete }) => {
    const { id, name, description, price, productCategoryName, comments, images } = product;
    const [showImageList, setShowImageList] = useState(false);

    const toggleImageList = () => {
        setShowImageList(prevState => !prevState);
    };

    return (
        <tr>
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
            <td>
                <div className="image-gallery">
                    {showImageList ? (
                        <ul>
                            {images.map(image => (
                                <li key={image.id}>
                                    <img src={image.imageUrl} alt={name} style={{ width: '100px' }} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <img
                            src={images[0].imageUrl}
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
            <td>
                <button
                    onClick={() => onDelete(id)}
                    disabled={loadingDelete}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                <button
                    onClick={() => onEdit(product)}
                    className="btn btn-primary"
                >
                    Edit
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;
