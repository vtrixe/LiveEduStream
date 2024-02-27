"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/state/use-dashboard";

interface WrapperProps {
  children: React.ReactNode;
};

export const Wrapper = ({
  children,
}: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside className={cn(
      "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg bg-black text-red-300 border-r border-[#2D2E35] z-50",
      collapsed && "lg:w-[70px]"
    )}>
      {children}
    </aside>
  );
};