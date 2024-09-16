import Link from 'next/link';
import NavbarLinks from './links';
import Logo from '../logo';

async function Navbar() {
    return (
        <nav className='w-full flex items-center justify-center'>
            <div className='mx-auto py-5 px-5 w-full flex justify-center max-w-screen-lg'>
                <Link href='/' className='flex items-center'>
                    <Logo className='mr-5' />
                </Link>
                <div className='flex items-center gap-3 mr-0 ml-auto'>
                    <NavbarLinks />
                </div>
            </div>
        </nav >
    )
}

export default Navbar
