import { UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = async () => {

  return (
    <div className='flex z-10 p-2 sticky items-center border-b-2 justify-between  w-full'>
      <Link className='flex ml-5 items-center' href={'/'}>
        <Image
          src="https://s3.us-east-1.wasabisys.com/imagine-frontend/gif/imagine-logo.gif" alt={''}
          width="50"
          height="50"
        />
        <h4 className='text-base font-semibold '>Imagine</h4>
      </Link>
      <nav className='hidden md:block'>
        <div className='rounded flex justify-between items-center border-2 m-2 p-2'>
          <div className='mx-2 pr-4 border-r-2 '>
            <Link href={'/'}>Blog</Link>
          </div>
          <div className='mx-2 pr-4 border-r-2'>
            <Link href={'/'}>Community</Link>
          </div>
          <div className='mx-2 pr-4 border-r-2'>
            <Link href={'/'}>Affiliate</Link>
          </div>
          <div className='mx-2 pr-4'>
            <Link href={'/'}>Api</Link>
          </div>
        </div>
      </nav>
      <div className='hidden md:block'>
        <Button variant="sky" className='mr-5'>
          Go to Dashboard
        </Button>
      </div>
      <div className='block md:hidden'>
        <div className='flex gap-2 justify-between items-center'>
          <Button variant="default">Sign In</Button>
          <Button variant="sky" className='mr-5'>
            Open in App
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;