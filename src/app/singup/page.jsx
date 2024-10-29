"use client"
import SocialLink from '@/components/SocialLink/SocialLink';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const SingUpPage = () => {
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        };
        const resp = fetch(`${process.env.NEXT_PUBLIC_VITE_URL}/singup/api`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            },
        })
         if(resp.status === 200){
            router.push('/')
        }
    }

    return (
        <div className='container mx-auto py-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                <div >
                    <Image width={540} height={540} src={'/assets/image/login/login.svg'} alt='login image' priority />
                </div>


                <div>
                    <section className=" text-slate-900">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-stone-100 ">
                                Scribble <span className='text-primary'>Box</span>
                            </a>
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl ">
                                        Please Create A New Account
                                    </h1>
                                    <form
                                        onSubmit={handleRegister}
                                        className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">User Name</label>
                                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your Full Name" required />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your Email" required />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                                                </div>
                                            </div>

                                        </div>
                                        <button type="submit" className="w-full text-white btn btn-primary">Sign in</button>
                                        <div className='divider'>or</div>
                                        <SocialLink />
                                        <p className="text-sm font-light text-gray-500 ">
                                            Don’t have an account yet? <Link href='/login' className="font-medium text-primary hover:underline ">Sign in</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SingUpPage;