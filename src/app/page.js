"use client";

import React from "react";
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="p-8">
      {status === "authenticated" ? (
        <button className="text-white" onClick={() => signOut()}>Logout</button>
      ) : (
        <p>Please log in to see the Logout button.</p>
      )}
    </div>
  );
}
