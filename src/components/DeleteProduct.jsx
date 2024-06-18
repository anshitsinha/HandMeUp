"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { deleteDoc, getFirestore, doc } from "firebase/firestore";
import { app } from "@src/firebase";
import { useRouter } from "next/navigation";

export default function DeleteProduct({ data }) {
  const db = getFirestore(app);
  const router = useRouter(); // Get router object from useRouter hook
  const { data: session } = useSession();

  const deleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        if (session?.user?.email === data.seller) {
          await deleteDoc(doc(db, "products", data.id));
          console.log("Product successfully deleted!");
          router.push("/"); // Use router.push to navigate to home page
        } else {
          alert("You are not authorized to delete this post");
        }
      } catch (error) {
        console.error("Error removing product: ", error);
      }
    }
  };

   console.log(data.seller);
  console.log(session?.user?.email);

  return (
    <div>
      
      {session?.user?.email === data.seller && (
        <div onClick={deleteProduct}>Delete</div>
      )}
    </div>
  );
}
