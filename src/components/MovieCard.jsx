import React from "react";

const MovieCard = ({ movie }) => {
if (!movie.poster_path) return null;
  return (
    <section>
      <div className="max-w-7xl mx-auto ">
        <a href={`movie-details/${movie.id}`}>

        <div className="flex flex-col gap-3 items-center text-white px-10">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-tl-3xl rounded-br-3xl"
              alt="not found"
              />
            <div className="absolute bottom-3 -right-4 bg-yellow-600 p-2 rounded-full  font-bold">
                {movie.vote_average.toFixed(1)}
            </div>
          </div>
          <div className="space-y-1 pr-10 flex flex-col justify-start w-full">
            <h1 className="text-xl font-bold">{movie.title}</h1>
            <p className="text-sm">Release Date: {movie.release_date}</p>
            {/* <p>{movie.vote_average}</p> */}
            {/* <p>{movie.overview}</p> */}
          </div>
        </div>
              </a>
      </div>
    </section>
  );
};

export default MovieCard;
