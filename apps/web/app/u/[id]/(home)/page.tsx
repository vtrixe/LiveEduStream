/* eslint-disable no-unused-vars */

// import { currentRole } from '@/lib/auth';
import { currentRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const role = await currentRole();

  if(role !== "LECTURER"){
    redirect("/");
  }


  return (
    <div>
  This is the Lecturer's Dashboard
    </div>
  );
};

export default Dashboard;