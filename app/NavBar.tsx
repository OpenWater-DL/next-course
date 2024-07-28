'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  const {status,data:session} = useSession()


  return (
    <nav className="flex  p-3 gap-5 bg-yellow-200 text-black ">
        <Link href={'/'}>Next.js</Link>
        <Link href={'/users'}>Users</Link>
        <Link href={'/products'}>Products</Link>
  {status === 'loading' &&  null}
  {status === 'authenticated' &&  <div>{session.user!.name} 
    <Link href="/api/auth/signout" className='ml-3'>sign out</Link></div>}
  {status === 'unauthenticated' &&    <Link href={'/api/auth/signin'}>Login</Link>}

      

    </nav>
  )
}

export default NavBar