import axios from "axios";

const tmdb = axios.create({
  baseURL: process.env.TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
});

export default tmdb;