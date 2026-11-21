import axios from "axios";

const API_KEY = "7acbc6a0e91987e8ec8d8e365b57a1c7";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: API_KEY, language: "en-US" },
});

export const posterUrl = path => `${IMAGE_BASE}${path}`;

export const getNowPlaying = () =>
    tmdb.get("/movie/now_playing", { params: { page: 1 } }).then(res => res.data.results);

export const getUpcoming = () =>
    tmdb.get("/movie/upcoming", { params: { page: 1 } }).then(res => res.data.results);

export const searchMovies = query =>
    tmdb.get("/search/movie", { params: { page: 1, include_adult: false, query } }).then(res => res.data.results);

export const getMovie = id =>
    tmdb.get(`/movie/${id}`).then(res => res.data);
