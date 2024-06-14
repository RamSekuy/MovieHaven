import React from "react";
import NowShowingPage from "../_components/listFilmComponent/nowShowing";
import MovieContainer from "../_components/listFilmComponent/movieContainer";

const NowShowing: React.FC = () => {
  return (
    <MovieContainer text="Now Showing">
      <NowShowingPage />;
    </MovieContainer>
  );
};

export default NowShowing;
