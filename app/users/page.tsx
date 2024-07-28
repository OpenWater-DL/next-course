        
import React, { Suspense } from 'react'
import UserTable from './UserTable'
import Link from 'next/link';



interface Props{
  searchParams:{
    sortOrder:string;
  }
}

const UsersPage = async( {searchParams:{sortOrder}}:Props) => {
  
  // when we use tetch function,默认会认为数据是静态的，除非设置不断更新数据，而非依赖cache
   
  console.log(sortOrder)
    return (
        <>
    <h1>Users</h1>
    <Link href='/users/new' className='btn'>new</Link>

   
    <UserTable sortOrder={sortOrder} />
    </>
    )
}

export default UsersPage