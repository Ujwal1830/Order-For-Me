import React from 'react';
import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function MyOrders() {

  const {data: session, status} = useSession()

  if(status=='unauthenticated'){
    return redirect("/login")
  }

  return (
    <div>MyOrders</div>
  )
}
