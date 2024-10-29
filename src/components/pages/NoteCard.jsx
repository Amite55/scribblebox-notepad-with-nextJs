"use client";
import React, { useEffect, useState } from 'react';
import { PiDotsThreeCircle } from "react-icons/pi";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineAdd } from "react-icons/md";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '../LoadingSpiner/Spinner';


const NoteCard = () => {
    const session = useSession();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    // get all data from database ==============
    const loadData = async () => {
        setLoading(true);
        const { data: notesData } = await axios.get(`${process.env.NEXT_PUBLIC_VITE_URL}/my-notes/api/${session?.data?.user?.email}`)
        setNotes(notesData?.myNotes);
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [session]);


    const handleEdit = () => {
        console.log('Edit modal click');
    }

    const handleDelete = async (id) => {
        const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_VITE_URL}/my-notes/notes/${id}`)
        if (data?.response?.deletedCount > 0) {
            toast.success('This Note Deleted')
            setTimeout(() => {
                loadData()
                window.location.href = '/';
            }, 500)

        }
    }

    return (
        <>
            {
                loading ? (
                    <Spinner/>
                )
                    :
                    <div className='px-40 py-10'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-2xl font-bold my-4'>Notes</h1>
                            <button className='text-2xl px-3 py-2 bg-black rounded-lg hover:bg-slate-800 duration-500'>
                                <PiDotsThreeCircle />
                            </button>
                        </div>
                        {
                            notes ? notes.map(note => (
                                <div key={note._id} className='bg-slate-800 px-8 py-4 border-b rounded-md mb-1 hover:bg-slate-700 hover:cursor-pointer'>
                                    <Link href={`/services/${note._id}`}>
                                        <div className='flex justify-between items-center'>

                                            <div>
                                                <h3 className='text-lg'>{note?.title}</h3>
                                                <div className='flex justify-start gap-2'>
                                                    <p>{note?.date}</p>
                                                    <p className='text-sm text-gray-400'>
                                                        {note?.note_description.split(' ').slice(0, 10).join(' ')}{note.note_description.split(' ').length > 10 ? '....' : ''}
                                                    </p>
                                                </div>
                                            </div>



                                            <div
                                                className='flex gap-2'>
                                                <button
                                                    onClick={() => handleDelete(note._id)}
                                                    className='text-xl btn btn-sm hover:text-white'>
                                                    <FaDeleteLeft />
                                                </button>

                                                <button
                                                    onClick={() => handleEdit(note._id)}
                                                    className='text-xl btn btn-sm hover:text-white' >
                                                    <FaEdit />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                                :
                                <div>
                                    NO Notes
                                </div>
                        }

                        <div
                            title='ADD NEW NOTE' className='flex justify-center items-center mt-5'>
                            <button

                                className='text-4xl font-extrabold hover:text-primary'>
                                <a href="/noteAdd"><MdOutlineAdd /></a>
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default NoteCard;