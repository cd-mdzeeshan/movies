"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/Search";
import MovieCard from "@/components/MovieCard";
import tmdb from "@/lib/tmdb";

export default function MovieList({ initialMovies }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      const url = query
        ? `/search/movie?query=${query}&page=${page}`
        : `/discover/movie?page=${page}`;

   
      const{ data} = await tmdb.get(url);

      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    }

    fetchMovies();
  }, [query, page]);

  const handleSearch = (q) => {
    if (q.trim()) {
      router.push(`/?search=${encodeURIComponent(q)}&page=1`);
    } else {
      router.push(`/?page=1`);
    }
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchBar onSearch={handleSearch} initialQuery={query} />

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 gap-y-5">
            {movies?.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p className="col-span-4 text-center text-gray-500">
                No movies found
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-white flex items-center">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
