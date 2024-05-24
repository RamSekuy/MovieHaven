import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IMovie } from "../_model/movie.model";
import mainAPI from "../_lib/axios";

export default function page() {
  const [movie, setMovie] = useState<IMovie[]>([]);
  const params = useParams();
  async function fetchMovie() {
    const result = await mainAPI.get(`/movie/${params.omdbId}`);
    setMovie(result.data.data);
  }
  useEffect(() => {
    fetchMovie();
  }, []);
  return <div>{JSON.stringify(movie)}</div>;
}
