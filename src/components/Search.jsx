import React from 'react'
import { CiSearch } from "react-icons/ci";

export const Search = () => {
  return (
    <div>
    <form action="">
      <input
        type="text"
        name="search"
        id="search"
        className="bg-bgColor border rounded px-2 py-1"
        aria-label="Search"
      />
      <button className="flex-col justify-center items-center">
        <CiSearch className="text-xl" />
      </button>
    </form>
  </div>
  )
}
