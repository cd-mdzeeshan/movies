import tmdb from "@/lib/tmdb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  try {
    const endpoint = query
      ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
      : `/discover/movie?page=${page}`;

    const { data } = await tmdb.get(endpoint);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err);

    return new Response(
      JSON.stringify({ results: [], total_pages: 1, error: "Failed to fetch movies" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
