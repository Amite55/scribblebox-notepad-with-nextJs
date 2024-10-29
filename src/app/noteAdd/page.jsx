"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'react-toastify';;

const NoteAdd = () => {
    const session = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: e.target.title.value,
            note_description: e.target.description.value,
            date: new Date().toISOString().split('T')[0],
            email: session.data?.user?.email
        }
        try {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_VITE_URL}/noteAdd/api`, newNote)
            if(resp.status === 200){
                toast.success('Add New Note!')
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='px-40 py-10'>
            <h3 className='text-xl my-6'>Add Your New Note!</h3>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Title</label>
                        <input type="name" name="title" id="title" className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Title" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Description</label>
                        <textarea type="name" name="description" id="description" className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Note Description" required />
                    </div>
                    <button type="submit" className="w-full text-white btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    );
};

export default NoteAdd;