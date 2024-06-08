import React, { useState } from 'react';

const ProductRow = ({ product, onDelete, onEdit, loadingDelete, status }) => {
    const { id, name, description, price, productCategoryName, comments, images } = product;
    const [showImageList, setShowImageList] = useState(false);

    const toggleImageList = () => {
        setShowImageList(prevState => !prevState);
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
                <button
                    onClick={() => onDelete(id)}
                    disabled={loadingDelete}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                <button
                    onClick={() => onEdit(product)} // Pass the product object to onEdit
                    className="btn btn-primary"
                >
                    Edit
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;
