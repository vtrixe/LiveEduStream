import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg bg-white dark:bg-black flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">
              Get LiveEduStream for free
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/organizations/organization-list">
             Join your Organization
            </Link>
          </Button>
          
         
        </div>
        <div>
            <ModeToggle />
          </div>
      </div>
    </div>
  );
};