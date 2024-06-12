import Image from "next/image";
import { IMovie } from "@/app/_model/movie.model";
import mainAPI from "@/app/_lib/mainApi";

const ComingSoonPage = async ({
  comingSoonMovies,
}: {
  comingSoonMovies?: IMovie[];
}) => {
  comingSoonMovies =
    comingSoonMovies ||
    (await mainAPI.get("/movie", { params: { status: "CommingSoon" } })).data
      .data;
  return (
    <>
      {comingSoonMovies?.map((movie) => (
        <div
          key={movie.id}
          className="w-full sm:w-1/2 md:w-1/3 xl:w-[250px] p-2"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-0 pb-[150%]">
              <Image
                src={movie.poster}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-md font-semibold h-10 mb-2">{movie.title}</h3>
              <p className="text-gray-600">{movie.age}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ComingSoonPage;
