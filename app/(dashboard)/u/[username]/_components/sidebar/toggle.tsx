"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/state/use-dashboard";
import { getUserRole } from "@/services/user";

export const Toggle = () => {
  const {
    collapsed,
    onExpand,
    onCollapse,
  } = useCreatorSidebar((state) => state);

  const { user }= useUser();

  if(!user?.username){
    return null;
  }

//   const role = getUserRole(user.username);

  const label = collapsed ? "Expand" : "Collapse";


  return (
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              variant="ghost"
              className="h-auto p-2"
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary text-white">
            Your Dashboard
          </p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};