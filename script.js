'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const search = document.getElementById('search')

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

const fetchpopuler = async ()=>{
  const url = constructUrl(`movie/popular`);
  const res = await fetch(url);
  const popdata = await res.json();
  CONTAINER.innerHTML= "";
  renderMovies(popdata.results)
}
const fetchnowplay = async ()=>{
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  const popdata = await res.json();
  CONTAINER.innerHTML= "";
  renderMovies(popdata.results)
}
const fetchrated = async ()=>{
  const url = constructUrl(`movie/top_rated`);
  const res = await fetch(url);
  const popdata = await res.json();
  CONTAINER.innerHTML= "";
  renderMovies(popdata.results)
}
const fetchupcoming = async ()=>{
  const url = constructUrl(`movie/upcoming`);
  const res = await fetch(url);
  const popdata = await res.json();
  console.log(popdata.results)
  CONTAINER.innerHTML= "";
  renderMovies(popdata.results)
}

document.getElementById('popular').addEventListener('click',fetchpopuler);
document.getElementById('relase').addEventListener('click',fetchnowplay);
document.getElementById('rated').addEventListener('click',fetchrated);
document.getElementById('upcoming').addEventListener('click',fetchupcoming);

const fetchaction = async ()=>{
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  const popdata = await res.json();
  console.log(popdata.genres)
  CONTAINER.innerHTML= "";
  renderMovies(popdata.genres)
}




document.getElementById('action').addEventListener('click',fetchaction);
document.getElementById('comedy').addEventListener('click',fetchupcoming);
document.getElementById('sci').addEventListener('click',fetchupcoming);
document.getElementById('romance').addEventListener('click',fetchupcoming);


const fetchsearch = async (v)=>{
  console.log(v)
  let url = `"https://api.themoviedb.org/3/search/movie?api_key=542003918769df50083a13c415bbc602&query="${v}`;
  const res = await fetch(url);
  const popdata = await res.json();
  console.log(popdata.results)
  CONTAINER.innerHTML= "";
  renderMovies(popdata.results)
}
document.querySelector('form').addEventListener('submit',(e)=>{
  e.preventDefault;
  fetchsearch(e.target.search.value);
});



// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

const renderlist = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <h3>${movie.name}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

document.addEventListener("DOMContentLoaded", autorun)

