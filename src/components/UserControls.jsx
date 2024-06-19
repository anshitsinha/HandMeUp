"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const UserControls = () => {
  const { status } = useSession();

  return (
    <div className="flex gap-5">
      <Link className="text-textGrey hover:text-white" href="/add-product">
        Sell
      </Link>
      {status === "authenticated" ? (
        <div
          className="text-textGrey hover:text-white"
          onClick={() => signOut()}
        >
          Logout
        </div>
      ) : (
        <Link className="text-textGrey hover:text-white" href={"/signin"}>
          SignIn
        </Link>
      )}
    </div>
  );
};

export default UserControls;
