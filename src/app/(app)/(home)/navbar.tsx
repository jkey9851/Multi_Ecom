"use client"

import React, { useState } from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import NavbarSidebar from './navbar-sidebar'
import { MenuIcon } from 'lucide-react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["700"],
})

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItems = ({
  href,
  children,
  isActive,
}: NavbarItemProps) =>{
  return (
    <Button
    asChild
     variant="outline"
     className={cn(
      "bg-transparent hover:black hover:border-primary border-transparent rounded-full px-3 text-lg hidden md:inline-flex  hover:bg-pink-300",
      isActive && "bg-pink-400 text-white hover:text-pink-400"
      )}>
        <Link href={href}>
          {children}
        </Link>
    </Button>
  )
}

const navbarItems =[
  {href: "/", children: "Home"},
  {href: "/about", children: "About"},
  {href: "/features", children: "Features"},
  {href: "/pricing", children: "Pricing"},
  {href: "/contact", children: "Contact"},
]
 

const Navbar = () => {
  const pathname = usePathname();
  const [isOpenNavSidebar,setIsOpenNavSidebar] = useState(false)

  return (
    <nav className='h-20 bg-white flex border-b justify-between font-medium'>
      <Link href="" className='pl-6 flex items-center' >
        <span className={cn("text-5xl font-semibold", poppins.className)}> vhoang</span>
      </Link>
      <NavbarSidebar
       open={isOpenNavSidebar}
       items={navbarItems}
       onOpenChange={setIsOpenNavSidebar}
      />
      <div className="items-center gap-4 lg:flex">
      {navbarItems.map((item)=>(
        <NavbarItems
         key={item.href}
         href={item.href}
         isActive={pathname === item.href}
        >
          {item.children}
         </NavbarItems>
      ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className='border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg'
        >
          <Link href={'/sign-in'}>
            Login
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className='border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg'
        > 
        <Link href={"/sign-up"}>
        Start Selling
        </Link>
        </Button>
      </div>
      <div className='flex lg:hidden items-center justify-center'>
        <Button
          variant="ghost"
          className='size-12 border-transparent bg-white'
          onClick={()=> setIsOpenNavSidebar(true)}
        >
          <MenuIcon></MenuIcon>
        </Button>

      </div>
    </nav>
  )
}

export default Navbar