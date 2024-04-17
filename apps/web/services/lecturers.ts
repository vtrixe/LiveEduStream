import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
export async function getLecturers() {
  const session = await currentUser();
  const userId = session.id;
  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  
  const lecturers = await db.user.findMany({
    where: {
      role: 'LECTURER',
      emailDomain: {
        not: {
          in: ['@gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'aol.com'], 
        },
        
      },
    
      id: {
        not: dbUser?.id,
      },
      NOT : {
        enrolledBy : {
          some : {
            enrolledById : dbUser?.id
          }
        }
      }
    },
  });

  return lecturers;
}