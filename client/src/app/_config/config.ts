export const MAIN_API =
  (process.env.MAIN_API as `http://${string}`) || "http://localhost:8000";

export const OMDB_KEY = process.env.OMDB_KEY;
