import React from "react";
import ListMovie from "../_components/listFilmComponent/listMovie";
import NowShowingPage from "../_components/listFilmComponent/nowShowing";

const NowShowing: React.FC = () => {
  return (
    <ListMovie movieStatus="Now Showing">
      <NowShowingPage />
    </ListMovie>
  );
};

export default NowShowing;
