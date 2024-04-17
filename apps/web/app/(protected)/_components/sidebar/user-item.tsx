"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-badge";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  description: string;
  id: string;
}

export const UserItem = ({
  username,
  imageUrl,
  isLive,
  id,
  description,
}: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state: any) => state);
  const href = `/${id}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-auto", // Updated to h-auto to accommodate the description
        collapsed ? "justify-center" : "justfy-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex flex-col items-center w-full gap-x-4", // Updated to flex-col to stack description below username
            collapsed && "justify-center"
          )}
        >
          <div className="flex items-center">
            <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
            {!collapsed && <p className="truncate">{username}</p>}
            {!collapsed && isLive && <LiveBadge className="ml-auto" />}
          </div>
          {!collapsed && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};