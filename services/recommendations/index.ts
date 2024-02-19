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

    const recommendedUsers = await db.user.findMany({
        where: {
            organizations: {
                some: {
                    id: {
                        in: organizationIds,
                    },
                },
            },
            NOT: {
                id: self.id,
            },
            OrganizationRole : "LECTURER"
        },
        include: {
            organizations: true, 
        },
    });

    return recommendedUsers;
};
