import { Suspense } from "react";
import MovieList from "@/components/MovieList";
import tmdb from "@/lib/tmdb";

const Home = async () => {
  const { data } = await tmdb.get("/discover/movie");

  return (
    <div>
      <Suspense fallback={<p>Loading movies...</p>}>
        <MovieList initialMovies={data?.results} />
      </Suspense>
    </div>
  );
};

export default Home;
