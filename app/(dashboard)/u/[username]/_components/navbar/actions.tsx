import Link from "next/link";
import { LogOut } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/home">
          <LogOut className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserButton
        afterSignOutUrl="/"
      />

      <OrganizationSwitcher />
    </div>
  );
};