import Link from 'next/link';
import React from 'react';
import {auth,signOut,signIn} from '@/auth';
import { getProviders } from 'next-auth/react';

const Navbar = async () => {
    const session = await auth()

  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center text-black'>
            <Link href='/'>
                <img src='/logo.png' alt='logo' width = {144} height={30} />
            </Link>


            <div className='flex items-center gap-5'>

                {session && session?.user?(
                    <>
                        <Link href="/startup/create">
                            <span>Create</span>
                        </Link>

                        <form action = {async () => {
                            "use server";
                            await signOut();
                        }}>
                            <button type='submit'>
                                <span>Logout</span>
                            </button>
                        </form>

                        <Link href={`/user/${session?.user?.id}`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                    </>
                ):(
                    <form action={async () => {
                        "use server";
                        await signIn('github');
                    }}>
                        <button type='submit'>
                            <span>Login</span>
                        </button>
                </form>
                )}

            </div>
        </nav>
    </div>
  )
}

export default Navbar