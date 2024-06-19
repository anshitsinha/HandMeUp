"use client";


import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AddProductForm from "@src/components/AddProductForm";

export default function Sell() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  return (
    <div>
      <AddProductForm />
    </div>
  );
}

Sell.requireAuth = true;
