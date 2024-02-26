import { db } from "@/lib/db";
import { getCurrentUser } from "../auth";
import { currentUser } from "@clerk/nextjs";

export const getRecommended = async () => {
    const self = await  currentUser();

    if(!self){
        return null;
    }

  
    const currentUserWithOrgs = await db.user.findUnique({
        where: {
            externalUserId: self.id
        },
        include: {
            organizations: true,
        },
    });


    if(!currentUserWithOrgs){
        return null;
    }
    const organizationIds = currentUserWithOrgs.organizations.map(org => org.id);

    const current= await db.user.findUnique({
        where : {
            externalUserId : self.id,

        }
    })

    const recommendedUsers = await db.user.findMany({
        where: {
            organizations: {
                some: {
                    id: {
                        in: organizationIds,
                    },
                },
            },
            NOT: [
                {
                    id: self.id,
                },
                // Add a condition to exclude users (lecturers) the current user has enrolled to
                {
                    enrolledBy: {
                        some: {
                            enrolledId: current?.id,
                        },
                    },
                },
            ],
            OrganizationRole: "org:lecturer",
        },
        include: {
            organizations: true, // Include organizations to get details
        },
    });
    

    return recommendedUsers;
};
