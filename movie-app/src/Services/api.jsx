const BASE_PATH = "https://api.themoviedb.org/3/";
const movieApiKey = process.env.REACT_APP_MOVIE_API_KEY;

//trending
//https://api.themoviedb.org/3/trending/all/day?api_key=0329efd914d0b55bf3ca4088bb9e4883&language=en-US
//popular movie
//https://api.themoviedb.org/3/movie/popular?api_key=0329efd914d0b55bf3ca4088bb9e4883&language=en-US//

export async function getMovies() {
  const response = await fetch(
    `${BASE_PATH}/trending/all/day?api_key=${movieApiKey}&language=en-US/`
  );
  return await response.json();
}
