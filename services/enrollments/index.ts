"use server"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Enroll, User } from "@prisma/client";
import { getCurrentUser } from "../auth";

interface EnrollmentProps {
  data: (Enroll & { following: User })[];
}

export const getEnrollments = async () => {
  try {
    const self = await currentUser();



    const current = await db.user.findUnique({
      where: {
          externalUserId: self?.id
      },
 
  });


    if(!self){
      throw new Error("Unauthoritized")
    }

    console.log(current?.id); // Make sure this prints the expected user ID


    const EnrolledLecturers = await db.enroll.findMany({
      where: {
        enrolledId: current?.id,
      },
      include: {
        enrolledBy: true,
      },
    });
    
    return EnrolledLecturers;
  }  catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
};


export const isEnrolled = async (id: string) => {
  try {
    const self = await currentUser();
    if(!self){
      return null;
    }
    const user = await db.user.findUnique({
      where: { externalUserId: self.id },
    });
  
    if (!user) {
      throw new Error("Not found");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

  if(otherUser?.OrganizationRole != "org:lecturer"){
    throw new Error("The user you are trying to enroll is not a lecturer");
  }
    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.enroll.findFirst({
      where: {
        enrolledId: user.id,
        lecturerId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

  
export const enrollUser = async (lecturerId: string) => {

  const self = await  currentUser();

    if(!self){
        return null;
    }

  
    const current = await db.user.findUnique({
        where: {
            externalUserId: self.id
        },
   
    });



  if (!self) {
    throw new Error("Unauthorized - User must be logged in to enroll.");
  }


  const lecturer = await db.user.findUnique({
    where: { id: lecturerId },
  });

  if (!lecturer) {
    throw new Error("Lecturer not found.");
  }

  if (lecturer.OrganizationRole !== 'org:lecturer') {
    throw new Error("The specified user is not a lecturer.");
  }

  if (lecturerId === self.id) {
    throw new Error("Cannot enroll to yourself.");
  }


  const existingEnrollment = await db.enroll.findFirst({
    where: {
      enrolledId: current?.id,
      lecturerId: lecturer.id,
    },
  });

  if (existingEnrollment) {
    throw new Error("Already enrolled to this lecturer.");
  }

  if(!current){
    return null;
  }



  

  console.log(current.id);
  console.log(lecturer.id)
  const enrollment = await db.enroll.create({
    data: {
      enrolledId: current.id,
      lecturerId: lecturer.id,
    },
  });

  return enrollment;
};


  
  export const unEnroll = async (id: string) => {
    const self = await currentUser();

    const current = await db.user.findUnique({
      where: {
          externalUserId: self?.id
      },
 
  });

  
    if (!self) {
      throw new Error("Unauthorized"); // Corrected typo and throwing the error
    }
  
    const otherUser = await db.user.findUnique({
      where: { id },
    });
  
    if (!otherUser) {
      throw new Error("User not found");
    }
  
    if (otherUser.id === self.id) {
      throw new Error("Cannot unEnroll yourself");
    }
  
    const existingFollow = await db.enroll.findFirst({
      where: {
        enrolledId: current?.id,
        lecturerId: otherUser.id,
      },
    });
  
    if (!existingFollow) {
      throw new Error("Not Enrolled");
    }
  
    return await db.enroll.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        enrolled: true,
        enrolledBy: true,

      },
    });
  };
  