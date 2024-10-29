"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import axios from 'axios';
import Spinner from '@/components/LoadingSpiner/Spinner';

const NoteDetails = ({ params }) => {
    const [noteDetailsData, setNoteDetailsData] = useState();
    const [loading, setLoading] = useState(false);
    const { data } = useSession()
    const router = useRouter();

    const loadBookingsData = async () => {
        setLoading(true)
        try {
            const { data: detailsNote } = await axios.get(`${process.env.NEXT_PUBLIC_VITE_URL}/my-notes/getNote/${params.id}`)
            setNoteDetailsData(detailsNote.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
        setLoading(false)
    };

    useEffect(() => {
        loadBookingsData();
    }, [params]);


    return (
        <>
            {
                loading ? (
                    <Spinner />
                )
                    :
                    <div className='px-40 py-10'>
                        <h1 className='text-3xl font-bold my-4'>Note Details</h1>
                        <div className='bg-slate-800 px-8 py-4 border-b rounded-md mb-1'>
                            <h2 className='text-2xl font-semibold mb-2'>{noteDetailsData?.title}</h2>
                            <p className='text-gray-400 mb-2'>{noteDetailsData?.date}</p>
                            <p>{noteDetailsData?.note_description}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button
                                onClick={() => router.push('/')}
                                className='mt-5 px-4 py-2 bg-blue-500 flex gap-2 items-center text-white rounded-lg hover:bg-blue-600'>
                                <FaHome /> Back to Notes
                            </button>
                            <Link href={`/editNote/${noteDetailsData?._id}`}>
                                <button
                                    className='mt-5 px-4 py-2 bg-blue-500 flex gap-2 items-center text-white rounded-lg hover:bg-blue-600'>
                                    <FaEdit /> Edit
                                </button>
                            </Link>
                        </div>
                    </div>
            }
        </>
    );
};

export default NoteDetails;
