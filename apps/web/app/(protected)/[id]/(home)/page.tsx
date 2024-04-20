

import React from 'react'
import { getUserById } from '@/data/user';
import { redirect } from 'next/navigation';
import { isEnrolled } from '@/services/enrollments';
import { Actions } from '../_components/actions';
interface DashProps {
    params : {
        id : string;


    }
}

const LecturerPage = async ({params}: DashProps) => {
  const user = await getUserById(params.id);
  if (!user ) {
    redirect('/')
  }

  
  const isEnrolledUser : boolean = await isEnrolled(params.id)
  return (
    <div>
      Name : {user.name}
      Description : {user.description}
      email : {user.email}
    <Actions isFollowing={isEnrolledUser} userId={params.id} />
    </div>


  )
}

export default LecturerPage