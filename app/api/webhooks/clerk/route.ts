import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request){
    const WEBHOOK_SECRET=process.env.CLERK_WEBHOOK_SECRET

    if(!WEBHOOK_SECRET){
        throw new Error('Please add WEBHOOK_SECRET from your Clerk Dashboard and configure it to your environment variables')
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");


    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
          status: 400
        })
      }

  const payload = await req.json()
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if(eventType === "user.created"){

    await db.user.create({
        data:{
            externalUserId:payload.data.id,
            username: payload.data.username,
            imageUrl: payload.data.image_url,
            email : payload.data.email_address,

            


        }

    })

  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        email: payload.data.email_address,

      },
    });
  }

 if(eventType === "organization.created"){

    
    await db.organization.create({
        data: {

            externalOrganizationId:payload.data.id,
            name : payload.data.name,
            
        }
    })

  const organization =   await db.organization.findUnique ({
        where: { externalOrganizationId: payload.data.id }
    })


    if(!organization ) {
        return new Response('Error occured', {
            status: 400
          })
    }

    await db.user.update ( {

        where : {
            externalUserId : payload.data.created_by
        } ,

        data: {

                
            organizations: {
                connect: { id: organization.id }
            },
            OrganizationRole : "MEMBER"
        }
    })
 }

 if (eventType === "organizationDomain.created") {
    // Extract externalOrganizationId from the payload
    const externalOrganizationId = payload.data.organization_id;

    if (!externalOrganizationId) {
        console.error('Error: externalOrganizationId is undefined');
        return new Response('Error occured - externalOrganizationId is undefined', {
            status: 400
        });
    }

    try {
        await db.organization.update({
            where: {
                externalOrganizationId: externalOrganizationId,
            },
            data: {
                organizationDomain: payload.data.name,
            },
        });
    } catch (err) {
        console.error('Error updating organization:', err);
        return new Response('Error occured during database update', {
            status: 500
        });
    }
}

if (eventType === "organizationMembership.created") {
    const orgId = payload.data.organization.id;
    const userId = payload.data.public_user_data.user_id;

    try {
        // Check if the organization exists
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

      
        const user = await db.user.findUnique({
            where: { externalUserId: userId }
        });

        if (!user) {
            console.error('User not found');
            return new Response('User not found', { status: 404 });
        }

    
        await db.user.update({
            where: { id: user.id },
            data: {

                
                organizations: {
                    connect: { id: organization.id }
                },
                OrganizationRole : "MEMBER"
            }
        });
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}

if (eventType === "organization.deleted") {
    const orgId = payload.data.organization.id;
    const userId = payload.data.public_user_data.user_id;

    try {
 
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

        await db.organization.delete(
            {
                where : {
                    externalOrganizationId: orgId
                }
            }
        )
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}

if (eventType === "organization.updated") {
    const orgId = payload.data.organization.id;
    const userId = payload.data.public_user_data.user_id;

    try {
 
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

        await db.organization.update(
            {
                where : {
                    externalOrganizationId: orgId
                } ,

                data : {
                    createdAt : payload.data.createdAt,

                    id: payload.data.id,

                    description : payload.data.description,

                    organizationDomain : payload.data.organizationDomain

                    


                }
            }
        )
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}

if (eventType === "organization.updated") {
    const orgId = payload.data.organization.id;
    const userId = payload.data.public_user_data.user_id;

    try {
 
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

        await db.organization.update(
            {
                where : {
                    externalOrganizationId: orgId
                } ,

                data : {
                    createdAt : payload.data.createdAt,

                    id: payload.data.id,

                    description : payload.data.description,

                    organizationDomain : payload.data.organizationDomain

                    


                }
            }
        )
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}


if (eventType === "organizationInvitation.created") {
    const orgId = payload.data.organization_id;
  

    try {
 
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

        await db.invitations.create(
            {
             
                data : {
                    email : payload.data.email_address,
                    externalInvitationid : payload.data.id,
                    role : payload.data.role,
                    OrganizationID : payload.data.organization_id,

                }
            }
        )
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}



if (eventType === "organizationInvitation.created") {
    const orgId = payload.data.organization_id;
  

    try {
 
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

        await db.invitations.create(
            {
             
                data : {
                    email : payload.data.email,
                    externalInvitationid : payload.data.id,
                    role : payload.data.role,
                    OrganizationID : payload.data.organization_id


                }
            }
        )
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}


if (eventType === "organizationInvitation.revoked") {


    await db.invitations.delete({
        where : {
            externalInvitationid : payload.data.id
        }
    })

}

if (eventType === "organizationMembership.updated") {
    const orgId = payload.data.organization.id;
    const userId = payload.data.public_user_data.user_id;

    try {
   
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

      
        const user = await db.user.findUnique({
            where: { externalUserId: userId }
        });

        if (!user) {
            console.error('User not found');
            return new Response('User not found', { status: 404 });
        }

    
        await db.user.update({
            where: { id: user.id },
            data: {



                
                organizations: {
                    connect: { id: organization.id }
                },
                OrganizationRole :  payload.data.role
            }
        });
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}



if (eventType === "organizationMembership.deleted") {
    const orgId = payload.data.organization.id;
    const userId = payload.data.public_user_data.user_id;

    try {
        const organization = await db.organization.findUnique({
            where: { externalOrganizationId: orgId }
        });

        if (!organization) {
            console.error('Organization not found');
            return new Response('Organization not found', { status: 404 });
        }

        const user = await db.user.findUnique({
            where: { externalUserId: userId }
        });

        if (!user) {
            console.error('User not found');
            return new Response('User not found', { status: 404 });
        }

    
        await db.user.update({
            where: { id: user.id },
            data: {

                
                organizations: {
                    disconnect: { id: organization.id }
                },
            
            }
        });
    } catch (err) {
        console.error('Error updating membership:', err);
        return new Response('Error occurred during database update', {
            status: 500
        });
    }
}




console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
console.log('Webhook body:', body)
 
return new Response('', { status: 200 })
}