"use client"

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';


const UserControls = () => {
    const { data: session, status } = useSession();

  return (


    <div className="flex gap-5">

<Link className="text-textGrey hover:text-white" href="/add-product">Sell</Link>


      {status === "authenticated" ? (
        <button className="text-textGrey hover:text-white"  onClick={() => signOut()}>Logout</button>
      ) : (
        <Link className="text-textGrey hover:text-white"  href={"/signin"}>SignIn</Link>
      )}
    </div>


    
   

    

    
  
  )
}

export default UserControls