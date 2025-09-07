"use client";
import { useSearchParams,useRouter } from "next/navigation";

import { useRef, useState } from "react";


export default function SearchBar({ onSearch }) {
    const router = useRouter();
    const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const ref = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
      onSearch(query);
    }else{
        router.push(`/`);
        onSearch("");
    }
  };
  const handleChange = (e) => {
    if(e.target.value === ""){
        router.push(`/`);
        onSearch("");
    } 
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {  setQuery(e.target.value);
            handleChange(e);
        }}
        className="border p-2 rounded w-full text-black bg-white"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Search
      </button>
    </form>
  );
}
