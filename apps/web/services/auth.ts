import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";


export const getSelfById = async (id: string) => {
    try {
  
  
      const session = await currentUser();
      const userId = session.id;
      const dbUser = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
  
  
      
      const user = await db.user.findUnique({ where: { id } });
  
      if(dbUser?.id !== user?.id){
        throw new Error("Unauthorized")
      }
  
  
      return user;
  
  
    } catch {
      return null;
    }
  };
  
  