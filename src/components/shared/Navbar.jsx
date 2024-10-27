"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import {  IoSearchOutline } from "react-icons/io5";


const Navbar = () => {
  const session = useSession();
  const router = useRouter()
    return (
        <div className="navbar shadow-2xl bg-base-100">
        <div className="navbar-start">
          <a href='' onClick={() => router.push('/')} className="btn btn-ghost text-xl">Scribble <span className='text-primary'>Box</span></a>
        </div>
        <div className="navbar-end">
        <IoSearchOutline size={22} />
          {/* <a href='/login' className="btn btn-primary btn-sm ml-2">Login</a> */}

          {!session.data ? <Link href={'/login'}>
                                <button className="btn btn-primary btn-sm ml-2">
                                    Login
                                </button>
                            </Link> : <button 
                            onClick={() => signOut()}
                            className="btn btn-primary btn-sm ml-2">
                                Logout
                            </button>
                        }
        </div>
      </div>
    );
};

export default Navbar;