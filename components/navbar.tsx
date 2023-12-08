"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from 'next/image'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const { setTheme } = useTheme()

  return (
    <div className='dark:bg-[#020817] flex z-50 p-2 sticky items-center border-b-2 overflow-hidden justify-between bg-white top-0  w-full'>
      <Link className='flex ml-5 gap-2 items-center' href={'/'}>
        <Image
          src="https://s3.us-east-1.wasabisys.com/imagine-frontend/gif/imagine-logo.gif" alt={''}
          width="50"
          height="50"
          className="rounded-md h-10 w-10"
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
      <div className="flex justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={"/dashboard"} className='hidden md:block'>
          <Button variant="sky" className='mr-5'>
            Go to Dashboard
          </Button>
        </Link>
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