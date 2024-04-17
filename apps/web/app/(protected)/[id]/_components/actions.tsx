"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { onEnroll } from "@/actions/enroll";
import { onUnEnroll } from "@/actions/enroll";
interface ActionsProps {
  isFollowing: boolean;
  userId: string;
};

export const Actions = ({
  isFollowing,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onEnroll(userId)
        .then((data) => toast.success(`You are now Enrolled to  ${data.enrolledTo.name}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnEnroll(userId)
        .then((data) => toast.success(`You have unEnrolled from ${data.enrolledBy.name}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

//   const handleBlock = () => {
//     startTransition(() => {
//       onUnblock(userId)
//         .then((data) => toast.success(`Unblocked the user ${data.blocked.username}`))
//         .catch(() => toast.error("Something went wrong"));
//     });
//   };

  return (
    <>
    <Button 
      disabled={isPending} 
      onClick={onClick} 

    >
      {isFollowing ? "unEnroll" : "Enroll"}
    </Button>
    {/* <Button onClick={handleBlock} disabled={isPending}>
      Block
    </Button> */}
    </>
  );
};
