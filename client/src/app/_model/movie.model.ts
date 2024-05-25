export interface IMovie {
  id: number;
  status: "CurrentlyPlaying" | "OutOfTheather" | "ComingSoon";
  omdbId: string;
  title: string;
  year: string;
  age: string;
  released: Date;
  length: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  poster: string;
}
