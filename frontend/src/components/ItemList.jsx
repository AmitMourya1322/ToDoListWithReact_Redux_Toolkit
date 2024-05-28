import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetListQuery, useCreateItemMutation, useDeleteItemMutation } from '../slices/itemApiSlice';
import './ItemList.css';

const ItemList = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const { data: items, error, isLoading } = useGetListQuery();
    const [createItem] = useCreateItemMutation();
    const [deleteItem] = useDeleteItemMutation();
    const [newItem, setNewItem] = useState('');
    const [addError, setAddError] = useState(null);

    const handleAddItem = async () => {
        try {
            await createItem({ item: newItem }).unwrap();
            setNewItem('');
            setAddError(null);
        } catch (err) {
            setAddError('Failed to add item');
            console.error('Failed to add item:', err);
        }
    };
    
//    const handleDeleteItem = async (itemId) => {
//     try {
//         await deleteItem(itemId).unwrap();
//     } catch (err) {
//         console.error('Failed to delete item: ', err);
//     }
// };
const handleDeleteItem = async (itemId) => {
    try {
        await deleteItem(itemId).unwrap();
    } catch (err) {
        console.error('Failed to delete item: ', err);
    }
};



    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading items.</p>;

    return (
        <div className="item-list-container">
            {userInfo && (
                <div className="add-item-container">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add new item"
                        className="add-item-input"
                    />
                    <button onClick={handleAddItem} className="add-item-button">Add Item</button>
                    {addError && <p className="error-message">{addError}</p>}
                </div>
            )}
            <ul className="item-list">
                {items.map((item) => (
                    <li key={item._id} className="item">
                        <span className="item-name">{item.item}</span>
                        {userInfo && userInfo.isAdmin && (
                           <button onClick={() => handleDeleteItem(item._id)} className="delete-item-button">Delete</button>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
