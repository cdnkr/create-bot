'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BiLogInCircle } from 'react-icons/bi';
import Logo from './logo';

function Navbar() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <nav className='w-full flex items-center justify-center'>
            <div className='mx-auto py-5 px-5 w-full flex justify-center max-w-screen-lg'>
                <Link href='/' className='flex items-center'>
                    <Logo className='mr-5' />
                </Link>
                <div className='flex items-center gap-3 mr-0 ml-auto'>

                    {pathName !== '/' ? (
                        <>
                            <Link href='/'>
                                <div className='w-10 h-10 hover:scale-105 hover:shadow-xl cursor-pointer flex items-center justify-center text-white bg-gray-800 rounded-full'>
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                                        <path d='M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z' />
                                        <path d='m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z' />
                                    </svg>
                                </div>
                            </Link>
                            <div onClick={() => router.back()} className='w-10 h-10 hover:scale-105 hover:shadow-xl cursor-pointer flex items-center justify-center text-white bg-gray-800 rounded-full'>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                                    <path fillRule='evenodd' d='M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <div onClick={() => router.forward()} className='w-10 h-10 hover:scale-105 hover:shadow-xl cursor-pointer flex items-center justify-center text-white bg-gray-800 rounded-full'>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                                    <path fillRule='evenodd' d='M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z' clipRule='evenodd' />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href='/login'>Login</Link>
                            <BiLogInCircle />
                        </>
                    )}
                </div>
            </div>
        </nav >
    )
}

export default Navbar
