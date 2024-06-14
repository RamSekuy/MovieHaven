import SlidePoster from "./_components/sleedComponent/sleed";
import NowShowingPage from "./_components/listFilmComponent/nowShowing";
import ComingSoonPage from "./_components/listFilmComponent/upComing";
import MovieContainer from "./_components/listFilmComponent/movieContainer";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container hover:shadow-[0_35px_60px_-15px_rgba(15,23,42)] transition-shadow duration-300 mx-auto flex justify-center flex-col max-w-[850px] p-4">
          {/* Slide Poster Section for Currently Playing Movies */}
          <div className="mb-8">
            <SlidePoster />
          </div>

          {/* Now Showing Section */}
          <MovieContainer text="Now Showing">
            <NowShowingPage />
          </MovieContainer>

          {/* Coming Soon Section */}
          <MovieContainer text="Coming Soon">
            <ComingSoonPage />
          </MovieContainer>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
