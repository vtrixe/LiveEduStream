/* eslint-disable no-unused-vars */
"use server"

import { NextResponse , NextRequest } from "next/server";


import { auth } from "@/auth";



export async function GET(req : NextRequest) {


    const session = await auth()
    console.log(session);



  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }




  return new NextResponse(JSON.stringify({ session }), { status: 200 });
}