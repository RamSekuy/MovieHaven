import { TMovie } from "./_model/movie.model";
import SlidePoster from "./_components/sleedComponent/sleed";
import NowShowingPage from "./_components/listFilmComponent/nowShowing";
import ComingSoonPage from "./_components/listFilmComponent/upComing";
import csrMainApi from "./_lib/axios/csrMainApi";

const HomePage = async () => {
  const allMovie: TMovie[] = await csrMainApi()
    .get("/movie")
    .then((res) => res.data.data)
    .catch((err) => []);

  const currentlyPlayingMovies = allMovie.filter(
    (e) => e.status == "CurrentlyPlaying"
  );

  const comingSoonMovies = allMovie.filter((e) => e.status == "CommingSoon");

  const promotionImages = [
    "https://via.placeholder.com/800x400?text=Promo+1",
    "https://via.placeholder.com/800x400?text=Promo+2",
  ]; // URL gambar promosi

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container hover:shadow-[0_35px_60px_-15px_rgba(15,23,42)] transition-shadow duration-300 mx-auto flex justify-center flex-col max-w-[850px] p-4">
          {/* Slide Poster Section for Currently Playing Movies */}
          {currentlyPlayingMovies.length > 0 && (
            <div className="mb-8">
              <SlidePoster
                movies={currentlyPlayingMovies}
                promotions={promotionImages}
              />
            </div>
          )}

          {/* Now Showing Section */}
          <NowShowingPage nowShowingMovies={currentlyPlayingMovies} />

          {/* Coming Soon Section */}
          <ComingSoonPage comingSoonMovies={comingSoonMovies} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
