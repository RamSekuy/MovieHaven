import React from "react";
import ListMovie from "../_components/listFilmComponent/listMovie";
import ComingSoonPage from "../_components/listFilmComponent/upComing";

const UpComing: React.FC = () => {
  return (
    <ListMovie movieStatus="Coming Soon">
      <ComingSoonPage />
    </ListMovie>
  );
};

export default UpComing;
