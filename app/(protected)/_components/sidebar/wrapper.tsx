"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/state/use-sidebar";
import { FollowingSkeleton } from "./enrollments";

interface WrapperProps {
  children: React.ReactNode;
};

export const Wrapper = ({
  children,
}: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-[#333333] border-r border-[#2D2E35] z-50 text-white",
        collapsed && "w-[70px]"
      )}
    >
      <FollowingSkeleton />
      {children}
    </aside>
  );
};