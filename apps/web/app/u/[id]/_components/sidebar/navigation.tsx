"use client";
import { usePathname } from "next/navigation";
import { 
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navigation = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.id}`,
      icon: Fullscreen,
    },
    {
      label: "RMTP Keys",
      href: `/u/${user?.id}/keys`,
      icon: KeyRound,
    },
    {
      label: "QnA",
      href: `/u/${user?.id}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Class",
      href: `/u/${user?.id}/community`,
      icon: Users,
    },
  ];

  if (!user?.id) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
     {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
     ))}
    </ul>
  );
};
