import Image from 'next/image'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import surfing from '@/public/images/surfing.jpg'

export default  async function Home() {

const session = await getServerSession(authOptions);

  return (
    
    <main className='relative h-screen'>
      <h1>Hello {session && session.user!.name} </h1>
      <Image src="https://bit.ly/react-cover" 
      fill
      className='object-cover'
    sizes="(max-width:480px) 100vw, (max-width:768px) 50vw, 33vw "

      alt='sufing'
      priority
      quality={100}
      />

    <ProductCard />
    

    </main>
  )
}
