
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { 
  SignInButton, 
  UserButton, 
  currentUser
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const Actions =  () => {


  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
  
      <UserButton />
    </div>
  );
};