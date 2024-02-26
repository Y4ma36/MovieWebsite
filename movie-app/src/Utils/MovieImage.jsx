export function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function makeVideoPath(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}
