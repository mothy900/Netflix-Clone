const API_KEY = "b59cfc002d15a1346cd5d1e8e9d3adae";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMoviesResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetPopMovieResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetRateMovieResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export default function getMovie() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopMovie() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getRateMovie() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
