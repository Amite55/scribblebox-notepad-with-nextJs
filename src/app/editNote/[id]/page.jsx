"use client"
import React, { useEffect, useState } from 'react';

const EditNote = ({params}) => {
    const [note, setNote] = useState([]);


    const loadBookingsData = async () => {
        try {
            const bookingsDetails = await fetch(`http://localhost:3000/my-notes/getNote/${params.id}`);
            if (!bookingsDetails.ok) {
                throw new Error("Data not found");
            }
            const data = await bookingsDetails.json();
            setNote(data?.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        loadBookingsData();
    }, [params]);

    console.log(note, 'notes edit');
    
    return (
        <div className='px-40 py-10'>
            <h3 className='text-xl my-6'>Edit Note!</h3>
            <div>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Title</label>
                        <input type="name" name="title" id="title" className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" defaultValue={note?.title} required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Description</label>
                        <textarea type="name" name="description" id="description" className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" defaultValue={note?.note_description} required />
                    </div>
                    <button type="submit" className="w-full text-white btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditNote;