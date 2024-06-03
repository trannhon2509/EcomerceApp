import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';

const CategoriesComponent = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCategories();
    }, [currentPage]); // Update data when currentPage changes

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/ProductCategories', {
                params: {
                    page: currentPage + 1, // API page starts from 1
                    pageSize: 10 // Change page size as needed
                }
            });
            setCategories(response.data.results);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSaveCategory = async () => {
        try {
            if (editCategoryId) {
                console.log('Updating category with ID:', editCategoryId);
                console.log('Payload:', {
                    id: editCategoryId,
                    name: editCategoryName, // Assuming the property name is 'name' in the backend model
                    // Other properties of the category can be updated here
                });
                // Update existing category
                await axios.put(`/api/ProductCategories/${editCategoryId}`, {
                    id: editCategoryId,
                    name: editCategoryName, // Assuming the property name is 'name' in the backend model
                    // Other properties of the category can be updated here
                });

                const updatedCategories = categories.map(category =>
                    category.id === editCategoryId ? { ...category, name: editCategoryName } : category
                );

                setCategories(updatedCategories);
            } else {
                // Add new category
                const response = await axios.post('/api/ProductCategories', {
                    name: newCategoryName,
                    // Other properties of the category can be added here
                });
                setCategories([...categories, response.data]);
            }
            handleCloseModal();
        } catch (error) {
            console.log(categories)
            console.error('Error saving category:', error);
        }
    };

    const handleEditCategory = (categoryId, categoryName) => {
        setEditCategoryId(categoryId);
        setEditCategoryName(categoryName);
        handleShowModal();
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`/api/ProductCategories/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleCloseModal = () => {
        setNewCategoryName('');
        setEditCategoryId(null);
        setEditCategoryName('');
        setShowModal(false);
    };

    const handleShowModal = () => setShowModal(true);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };


    return (
        <div>
            <h2>Categories</h2>
            <Button color="primary" onClick={handleShowModal}>Add Category</Button>
            <Modal isOpen={showModal} toggle={handleCloseModal}>
                <ModalHeader toggle={handleCloseModal}>{editCategoryId ? 'Edit Category' : 'Add New Category'}</ModalHeader>
                <ModalBody>
                    <input
                        type="text"
                        value={editCategoryId ? editCategoryName : newCategoryName}
                        onChange={(e) => editCategoryId ? setEditCategoryName(e.target.value) : setNewCategoryName(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button color="primary" onClick={handleSaveCategory}>{editCategoryId ? 'Update Category' : 'Save Category'}</Button>
                </ModalFooter>
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => handleEditCategory(category.id, category.name)}>Edit</button>
                                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLinkClassName="page-link"
            />
        </div>
    );
};

export default CategoriesComponent;
