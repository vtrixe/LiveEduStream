/* eslint-disable no-unused-vars */

import { currentRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const role = await currentRole();

  if(role !== "USER"){
    redirect("/");

  }
  return (
    <div>
  This is the User's Dashboard
    </div>
  );
};

export default Dashboard;