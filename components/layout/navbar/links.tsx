'use client';

import LoginInModal from '@/components/login/in-modal';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

function NavbarLinks() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
            }
        );

        // Check the initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session?.user);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <>
            {user ? (
                <>
                    <div className='transition-all hover:text-blue-500 flex items-center gap-1'>
                        <Link href="/app">My bots</Link>
                    </div>
                    <div className='transition-all cursor-pointer hover:text-blue-500 flex items-center gap-1' onClick={handleLogout}>
                        <span>Logout</span>
                        <BiLogOutCircle />
                    </div>
                </>
            ) : (
                <LoginInModal
                    TriggerEl={
                        <div className='transition-all cursor-pointer hover:text-blue-500 flex items-center gap-1'>
                            <span>Login</span>
                            <BiLogInCircle />
                        </div>
                    }
                />
            )}
        </>
    );
}

export default NavbarLinks;