import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { 
  OrganizationSwitcher,
  SignInButton, 
  UserButton, 
  currentUser
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const UserElements =  () => {


  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
    
        <div className="flex items-center gap-x-4">
          <UserButton
            afterSignOutUrl="/"
          />
          <OrganizationSwitcher />
        </div>

        </div>
    
    
  );
};