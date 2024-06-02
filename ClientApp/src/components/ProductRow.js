import React, { useState } from 'react';

const ProductRow = ({ product, onDelete, onRestore, loadingDelete }) => {
    const { id, name, description, price, productCategoryName, comments, images } = product;
    const [showImageList, setShowImageList] = useState(false); // Thêm trạng thái

    const toggleImageList = () => {
        setShowImageList(prevState => !prevState); // Hàm xử lý sự kiện để thay đổi trạng thái
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
                    {showImageList ? ( // Logic render để hiển thị danh sách ảnh hoặc chỉ hiển thị một ảnh đầu tiên
                        <ul>
                            {images.map(image => (
                                <li key={image.id}><img src={image.imageUrl} alt={name} style={{ width: '100px' }} /></li>
                            ))}
                        </ul>
                    ) : (
                        <img
                            src={images[0].imageUrl} // Chỉ hiển thị một ảnh đầu tiên
                            alt={name}
                            style={{ width: '100px' }}
                        />
                    )}
                </div>
                {images.length > 1 && ( // Nếu có nhiều hơn một ảnh, hiển thị nút chuyển đổi
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
                    onClick={() => onRestore(id)}
                    className="btn btn-success"
                >
                    Restore
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;
