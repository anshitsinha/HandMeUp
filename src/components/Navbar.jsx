import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import UserControls from "./UserControls";


export default function Navbar() {


  return (
    <div className="flex justify-between">
      {/* title */}

      <Link className="font-sans font-bold text-3xl" href={"/"}>
        HandMeUp
      </Link>

      {/* Search */}
      <div >
        <form action="">
          <input
            type="text"
            name="search"
            id="search"
            className="bg-bgColor border rounded px-2 py-1"
            aria-label="Search"
          />
          <button className="flex-col justify-center items-center">
            <CiSearch  className="text-xl"  />{" "}
          </button>
        </form>
      </div>

      {/* User Options */}
      <UserControls />
    </div>
  );
}
