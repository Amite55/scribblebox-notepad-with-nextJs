"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditNote = ({ params }) => {
    const [note, setNote] = useState([]);


    const loadBookingsData = async () => {
        try {

            const { data: getData } = await axios.get(`${process.env.NEXT_PUBLIC_VITE_URL}/my-notes/getNote/${params.id}`);
            setNote(getData?.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        loadBookingsData();
    }, [params]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateNote = {
            title: e.target.title.value,
            note_description: e.target.description.value,
            date: new Date().toISOString().split('T')[0]
        }

        const resp = await axios.patch(`${process.env.NEXT_PUBLIC_VITE_URL}/my-notes/updateNote/${params.id}`, updateNote);
        if (resp.status === 200) {
            toast.success('Updated success fully');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    }

    return (
        <div className='px-40 py-10'>
            <h3 className='text-xl my-6'>Edit Note!</h3>
            <div>
                <form
                    onSubmit={handleUpdate}
                    className="space-y-4 md:space-y-6" action="#">
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