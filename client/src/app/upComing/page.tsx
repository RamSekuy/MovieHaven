import React from "react";
import ComingSoonPage from "../_components/listFilmComponent/upComing";
import MovieContainer from "../_components/listFilmComponent/movieContainer";

const UpComing: React.FC = () => {
  return (
    <MovieContainer text="Comin Soon">
      <ComingSoonPage />;
    </MovieContainer>
  );
};

export default UpComing;
