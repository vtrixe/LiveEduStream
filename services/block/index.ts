import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const isBlockedByUser = async (id: string) => {
    try {
      const self = await currentUser();

      if (!self) {
        return null;
    }

      const current = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    });

    if (!current) {
        return null;
    }
  
      const otherUser = await db.user.findUnique({
        where: { id }
      });
  
      if (!otherUser) {
        throw new Error("User not found");
      }
  
      if (otherUser.id === current.id) {
        return false;
      }
  
      const existingBlock = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: otherUser.id,
            blockedId: current.id,
          },
        },
      });
  
      return !!existingBlock;
    } catch {
      return false;
    }
  };

export const blockUser = async (id: string) => {
    const self = await currentUser();

    if (!self) {
        return null;
    }

  
    const current = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    });

    if (!current) {
        return null;
    }


    if (current.OrganizationRole !== "org:lecturer") {
        throw new Error("Only lecturers can block users");
    }

    if (current.id === id) {
        throw new Error("Cannot block yourself");
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: current.id,
                blockedId: otherUser.id,
            },
        },
    });

    if (existingBlock) {
        throw new Error("Already blocked");
    }

  
    const block = await db.block.create({
        data: {
            blockerId: current.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true,
        },
    });

    return block;
};

export const unblockUser = async (id: string) => {
    const self = await currentUser();

    if(!self){
        throw new Error("Unauthoritized");
    }
  
    if (self.id === id) {
      throw new Error("Cannot unblock yourself");
    }

    const current = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    });

    if (!current) {
        return null;
    }
  
  
    const otherUser = await db.user.findUnique({
      where: { id },
    });
  
    if (!otherUser) {
      throw new Error("User not found");
    }
  
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: current.id,
          blockedId: otherUser.id,
        },
      },
    });
  
    if (!existingBlock) {
      throw new Error("Not blocked");
    }
  
    const unblock = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocked: true,
      },
    });
  
    return unblock;
  };