import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

const SocialLink = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const path = searchParams.get('redirect');
    const handleSocialLogin = async (provider) => {
        const resp = await signIn(provider, {
            redirect: true,
            callbackUrl: path ? path : '/'
        })
    }
    return (
        <div className='flex w-full justify-between gap-4'>
            <button 
            onClick={() => handleSocialLogin('google')}
            type="submit" className=" w-1/2 text-white btn btn-outline btn-primary">
                <FaGoogle size={24} className='text-blue-500' />
            </button>
            <button 
            onClick={() => handleSocialLogin('github')}
            type="submit" className="text-white btn w-1/2 btn-outline btn-primary">
                <FaGithub size={24} className='text-gray-600' />
            </button>
        </div>
    );
};

export default SocialLink;