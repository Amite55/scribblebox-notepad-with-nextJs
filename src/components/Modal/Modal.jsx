import React from 'react';

const Modal = ({ isOpen, onClose, onDelete, onEdit, id }) => {
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl text-black w-full flex justify-center font-bold mb-4">Actions</h2>
                <button 
                    onClick={()=>onEdit(id)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-2"
                >
                    Edit
                </button>
                <button 
                    onClick={ () => onDelete(id)}
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                >
                    Delete
                </button>
                <button 
                    onClick={onClose}
                    className="mt-4 flex justify-center items-center  w-full text-gray-500 hover:text-gray-800"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
