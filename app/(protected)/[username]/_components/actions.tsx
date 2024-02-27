"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { isEnrolled, unEnroll } from "@/services/enrollments";
import { onBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { enrollUser } from "@/services/enrollments";
import { onFollow, onUnfollow } from "@/actions/enroll";

interface ActionsProps {
  isEnrolled: boolean;
  userId: string;
};



export const Actions = ({
  isEnrolled,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  


  const handleFollow = () => {

    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success('You have unfollowed this lecturer'))
        .catch(() => toast.error("Something went wrong"));
    });
    
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success("You have Unernolled this lecturer."))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`Unblocked the user ${data?.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isEnrolled) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    <>
     <Button 
      disabled={isPending} 
      onClick={onClick} 
    >
      {isEnrolled  ? "UnEnroll" : "Enroll"}
    </Button>

    <Button onClick={handleBlock} disabled={isPending}>
      Block
    </Button>
    
    </>
   
  );
};