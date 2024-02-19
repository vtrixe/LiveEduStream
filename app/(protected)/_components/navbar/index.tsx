"use client"
import { Logo } from "@/components/logo";
import { Actions } from "./actions";
import { Search } from "./search";
import { UserButton } from "@clerk/nextjs";
export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-yellow-300 dark:bg-purple-600 px-2 lg:px-4 flex justify-between items-center shadow-sm">
       <Logo />
     { /* <Actions />  */}
      <Search />
    
      <Actions />
      
    </nav>
  );
};