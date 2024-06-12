// import SlidePoster from "./_components/sleedComponent/sleed";
import NowShowingPage from "./_components/listFilmComponent/nowShowing";
import ComingSoonPage from "./_components/listFilmComponent/upComing";
import ListMovie from "./_components/listFilmComponent/listMovie";

const HomePage = () => {
  // const promotionImages = [
  //   "https://via.placeholder.com/800x400?text=Promo+1",
  //   "https://via.placeholder.com/800x400?text=Promo+2",
  // ]; // URL gambar promosi

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container hover:shadow-[0_35px_60px_-15px_rgba(15,23,42)] transition-shadow duration-300 mx-auto flex justify-center flex-col max-w-[850px] p-4">
          {/* Slide Poster Section for Currently Playing Movies */}
          {/* {currentlyPlayingMovies.length > 0 && (
            <div className="mb-8">
              <SlidePoster
                movies={currentlyPlayingMovies}
                promotions={promotionImages}
              />
            </div>
          )} */}

          {/* Now Showing Section */}
          <ListMovie movieStatus="Now Showing">
            <NowShowingPage />
          </ListMovie>

          {/* Coming Soon Section */}
          <ListMovie movieStatus="Coming Soon">
            <ComingSoonPage />
          </ListMovie>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
