import { IMovie } from "@/app/_model/movie.model";
import Image from "next/image";
type props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  movie: IMovie;
};
export default function MainMovieCard({ onClick, movie }: props) {
  return (
    <div
      className="min-w-40 w-[250px] md:my-5 bg-white flex flex-col items-center rounded-xl m-auto group"
      onClick={onClick}
    >
      <div className="w-[200px] my-5 aspect-square object-top object-cover rounded-xl relative">
        <Image
          src={movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"}
          alt={movie.title}
          fill
          className="rounded-lg"
        />
      </div>
      <hr className="border-grey-200 border-solid border-2 w-full" />
      <div className="w-full flex flex-col px-5">
        <h1 className="font-bold w-[160px]">{movie.title}</h1>
        <h1 className="py-2">{movie.year}</h1>
        <h1 className="py-2">{movie.status}</h1>
      </div>
    </div>
  );
}
