export interface IMovie {
  id: number;
  status: "CurrentlyPlaying" | "OutOfTheather" | "CommingSoon";
  omdbId: String;
  title: String;
  year: String;
  age: String;
  released: Date;
  length: String;
  genre: String;
  director: String;
  actors: String;
  plot: String;
  language: String;
  country: String;
  poster: String;
}
