import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      {/* title */}
      <div> HandMeUp</div>

      {/* Search */}
      <div>
        <form action="">
          <input type="text" />
          <button>Search</button>
        </form>
      </div>

      {/* User Options */}
      <div className="flex gap-5">
        <Link href={'/add-product'}>Sell</Link>
        <Link href={'/login'}>LogIn</Link>
      </div>
    </div>
  );
}
