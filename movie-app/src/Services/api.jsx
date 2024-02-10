const BASE_PATH = "https://api.themoviedb.org/3/";
const TMDBAPIKEY = process.env.REACT_APP_MOVIE_API_KEY;
const LANGUAGE = "language=en-US";

//trending
//https://api.themoviedb.org/3/trending/all/day
//popular movie
//https://api.themoviedb.org/3/movie/popular
//Popular tv shows
//https://api.themoviedb.org/3/tv/popular
//Now playing movie
//https://api.themoviedb.org/3/movie/now_playing
//Top rated movie
//https://api.themoviedb.org/3/movie/top_rated

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_PATH}/trending/all/day?api_key=${TMDBAPIKEY}&${LANGUAGE}/`
  );
  return await response.json();
}

export async function getPopularTvShows() {
  const response = await fetch(
    `${BASE_PATH}/tv/popular?api_key=${TMDBAPIKEY}&${LANGUAGE}/`
  );
  return await response.json();
}

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${TMDBAPIKEY}&${LANGUAGE}/`
  );
  return await response.json();
}

export async function getNowPlayingMovie() {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${TMDBAPIKEY}&${LANGUAGE}/`
  );
  return await response.json();
}

export async function getTopRatedMovie() {
  const response = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${TMDBAPIKEY}&${LANGUAGE}/`
  );
  return await response.json();
}
