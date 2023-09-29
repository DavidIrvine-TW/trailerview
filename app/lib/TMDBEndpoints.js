export const TMDB_BASE_URL = process.env.TMDB_BASEURL
export const MONGO_URI = process.env.MONGO_DB_URI
export const API_KEY = process.env.TMDB_API_KEY
export const TMDB_TOKEN = process.env.TMDB_TOKEN
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original'

//getGenre-movie genres
export function getGenreMovie(){
    return 'https://api.themoviedb.org/3/genre/movie/list?language=en'
}
//getMovie-details
export function getMovieDetail(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}&append_to_response=videos`
}
//getMovie-videos
export function getMovieVideo(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}/videos`
}

//getMovie-credits
export function getMovieCredits(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}/credits`
}
//getCollection-trending movies
export function getTrendingMovies(pages){
    return `https://api.themoviedb.org/3/trending/movie/week?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection-popular
export function getPopularMovies(pages){
    return `https://api.themoviedb.org/3/movie/popular?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection-now_playing
export function getNowPlayingMovies(pages){
    return `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection-upcoming
export function getUpcomingMovies(pages){
    return `https://api.themoviedb.org/3/movie/upcoming?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection-upcoming
export function getTopRatedMovies(pages){
    return `https://api.themoviedb.org/3/movie/top_rated?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection-trending tv
export function getTrendingTV(pages){
    return `https://api.themoviedb.org/3/trending/tv/week?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getGenre-tv genres
export function getGenreTV(){
    return 'https://api.themoviedb.org/3/genre/tv/list?language=en'
}
//getCollection-airingtoday tv
export function getAiringTodayTV(pages){
    return `https://api.themoviedb.org/3/tv/airing_today?&language=en-US&sort_by=popularity.descpage=${pages}`
}
//getCollection-popular tv
export function getPopularTV(pages){
    return `https://api.themoviedb.org/3/tv/popular?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection-on air tv
export function getOnAirTV(pages){
    return `https://api.themoviedb.org/3/tv/on_the_air?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//getCollection- toprated tv
export function getTopRatedTV(pages){
    return `https://api.themoviedb.org/3/tv/top_rated?&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//get TV details
export function getTVDetail(TvId){
    return `https://api.themoviedb.org/3/tv/${TvId}`
}
//get TV credits
export function getTvCredits(TvId){
    return `https://api.themoviedb.org/3/tv/${TvId}/credits`
}
//get TV videos
export function getTVVideos(TvId){
    return `https://api.themoviedb.org/3/tv/${TvId}/videos`
}
//get genre collections - movie
export function getGenreCollectionsMovie(genreId, genreName, pages){
    return `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=${genreId}&name=${genreName}&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//get genre collections - tv
export function getGenreCollectionsTV(genreId, genreName, pages){
    return `https://api.themoviedb.org/3/discover/tv?include_adult=false&with_genres=${genreId}&name=${genreName}&language=en-US&sort_by=popularity.desc&page=${pages}`
}
//get search multi
export function getSearchMulti(query, pages) {
    return `https://api.themoviedb.org/3/search/multi?&query=${encodeURIComponent(query)}&page=${pages}`
}
//get Search TV
export function getSearchTV(query, pages) {
    return `https://api.themoviedb.org/3/search/tv?&query=${encodeURIComponent(query)}&page=${pages}`
}
//get Search movies
export function getSearchMovie(query, pages) {
    return `https://api.themoviedb.org/3/search/movie?&query=${encodeURIComponent(query)}&page=${pages}`
}