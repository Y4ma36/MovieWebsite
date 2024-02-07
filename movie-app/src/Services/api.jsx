const BASE_PATH = "https://api.themoviedb.org/3/";
const TMDBAPIKEY = process.env.REACT_APP_MOVIE_API_KEY;
const LANGUAGE = "language=en-US";

//trending
//https://api.themoviedb.org/3/trending/all/day?api_key=0329efd914d0b55bf3ca4088bb9e4883&language=en-US
//popular movie
//https://api.themoviedb.org/3/movie/popular?api_key=0329efd914d0b55bf3ca4088bb9e4883&language=en-US//
//Popular tv shows
//https://api.themoviedb.org/3/tv/popular?api_key=0329efd914d0b55bf3ca4088bb9e4883&language=en-US//
//Now playing movie
//https://api.themoviedb.org/3/movie/now_playing

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
    `${BASE_PATH}/movie/popular?api_key=${TMDBAPIKEY}&${LANGUAGE}`
  );
  return await response.json();
}

export async function getNowPlayingMovie() {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_keys=${TMDBAPIKEY}&${LANGUAGE}`
  );
  return await response.json();
}
