"use client"
import { Logo } from "@/components/logo";
import { Actions } from "./actions";
import { Search } from "./search";
import { UserButton } from "@clerk/nextjs";
import { UserElements } from "./userElements";
export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg bg-yellow-300 px-2 lg:px-4 flex justify-between items-center shadow-sm">
    <Logo />
    <Search />
    <Actions />
    {/* <UserElements /> */}
  </nav>
  );
};