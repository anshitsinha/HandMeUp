"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { deleteDoc, getFirestore, doc } from "firebase/firestore";
import { app } from "@src/firebase";
import { useRouter } from "next/navigation";

export default function DeleteProduct({ data: product }) {
  const db = getFirestore(app);
  const router = useRouter();
  const { data: session } = useSession();

  const deleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        if (session?.user?.email === product.seller) {
          await deleteDoc(doc(db, "products", product.id));
          console.log("Product successfully deleted!");
          router.push("/");
        } else {
          alert("You are not authorized to delete this post");
        }
      } catch (error) {
        console.error("Error removing product: ", error);
      }
    }
  };

  return (
    <div>
      {session?.user?.email === product.seller && (
        <div onClick={deleteProduct}>Delete</div>
      )}
    </div>
  );
}
