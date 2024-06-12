import Image from "next/image";
import { Metadata } from "next";
import { IMovie } from "../_model/movie.model";
import mainAPI from "../_lib/mainApi";
import Link from "next/link";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: {
    omdbId: string;
  };
}): Promise<Metadata> => {
  try {
    const result = (await mainAPI("/movie/" + params.omdbId)).data.data;
    return {
      title: result.title,
    };
  } catch (err) {
    redirect("/backendError");
  }
};

type Props = {
  params: {
    omdbId: string;
  };
};

export default async function MovieDetailPage({ params }: Props) {
  const movie: IMovie = await (
    await mainAPI.get(`/movie/${params.omdbId}`)
  ).data.data;
  return (
    <main className="w-full flex flex-col items-center h-auto pt-4 min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg"
            />
            <Link href={`/${params.omdbId}/ticket`}>
              <button className="flex bg-green-400 h-10 w-full rounded-full mt-5 justify-center items-center font-bold">
                Buy Your Ticket
              </button>
            </Link>
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p>
              <strong>Description:</strong> {movie.plot}
            </p>
            <p>
              <strong>Duration:</strong> {movie.length}
            </p>
            <p>
              <strong>Year:</strong> {movie.year}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Actors:</strong> {movie.actors}
            </p>

            <p>
              <strong>Age Rating:</strong> {movie.age}
            </p>
            <p>
              <strong>Country:</strong> {movie.country}
            </p>
            <p>
              <strong>Language:</strong> {movie.language}
            </p>
            <p>
              <strong>Status:</strong> {movie.status}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
