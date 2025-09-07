import tmdb from "@/lib/tmdb";
import React from "react";

const page = async ({ params }) => {
  const {id} = await params;
  console.log(id);
  const { data } = await tmdb.get(`/movie/${id}`);
//   console.log(data);
  const stars = Math.round(data.vote_average / 2);
  return (
    <section>
      {/* Movie Details Page */}
      <div>
        <div className="w-full h-[500px] relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
            className="object-cover w-full h-full sm:block hidden"
            alt="not found"
          />
          <div className="absolute inset-0 bg-black/70 h-full w-full flex items-center justify-center sm:flex-row flex-col"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="sm:absolute -bottom-40 left-10 flex sm:flex-row flex-col gap-5 w-full">
              <div className="sm:w-[370px] sm:h-[400px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  className="object-cover w-full h-full"
                  alt="not found"
                />
              </div>
              <div className="space-y-1 sm:pr-10 flex flex-col sm:items-start items-center  justify-center w-full h-full text-white mt-14 sm:px-0 px-3">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {" "}
                    {data.release_date.split("-")[0]}
                  </p>
                  <div className="flex items-start gap-2  px-2 py-1 rounded">
                    <p>Box Office : {data.revenue}</p>
                    <p>({data.vote_count} ratings)</p>
                  </div>
                </div>
                <div>
                  <p>
                    Genre -{" "}
                    {data.genres.map((genre, index) => {
                      if (index === data.genres.length - 1) {
                        return genre.name;
                      }

                      return genre.name + " | ";
                    })}
                  </p>
                </div>

                <h1 className="text-5xl font-bold">{data.title}</h1>
                {/* <p>{movie.vote_average}</p> */}
                {/* <p>{movie.overview}</p> */}
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-2xl">
                        {i < stars ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="ml-2 text-lg">{stars} / 5</span>
                  </div>
                  <p>Audience Rating</p>
                </div>
                <div className="flex mt-5 gap-5 sm:flex-row flex-col">
                  <p className="max-w-2xl py-5 sm:text-start text-center">{data.overview}</p>
                  <div className="bg-gray-800 p-5 rounded space-y-3 w-full">
                    <h3 className="text-xl font-bold">Details</h3>
                    <div>
                      <p>Production Companies:-</p>
                      <div>
                        {data.production_companies.map((company, i) => {
                          if (i === data.production_companies.length - 1) {
                            return <span key={i}>{company.name}</span>;
                          }
                          return <span key={i}>{company.name}, </span>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
