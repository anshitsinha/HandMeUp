"use client";

import AddProductForm from "@/components/AddProductForm";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function sell() {
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

sell.requireAuth = true;
