import Link from "next/link";
import React from "react";


import UserControls from "./UserControls";
import { Search } from "./Search";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      {/* title */}
      <Link className="font-sans font-bold text-3xl" href={"/"}>
        HandMeUp
      </Link>

      {/* Search */}
     <Search />

      

      {/* User Options */}
      <UserControls />
    </div>
  );
}
