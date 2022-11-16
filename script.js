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



const fetchhome = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  const data = await res.json();
  CONTAINER.innerHTML= "";
  renderMovies(data.results)
};
document.getElementById('home').addEventListener('click',fetchhome);



const fetchaction = async ()=>{
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  const popdata = await res.json();
}



document.getElementById('action').addEventListener('click',fetchaction);
document.getElementById('comedy').addEventListener('click',fetchupcoming);
document.getElementById('sci').addEventListener('click',fetchupcoming);





const fetchsearch = async (v)=>{
  console.log(v)
 // const url = constructUrlsearch(`search/movie`);
  //let urls = `"https://api.themoviedb.org/3/search/movie?api_key=542003918769df50083a13c415bbc602&query="${v}`;
  const url = `${TMDB_BASE_URL}/search/movie?api_key=542003918769df50083a13c415bbc602&query=${v}`
  const res = await fetch(url);
  const popdata = await res.json();
  console.log(popdata.results)
  CONTAINER.innerHTML= "";
  renderMovies(popdata.results)
}


document.querySelector('form').addEventListener('submit',(e)=>{
  e.preventDefault;
  console.log(e.target.search.value);
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
const renderabout = (movie) => {
  CONTAINER.innerHTML = `
  <div class="py-16 bg-white">  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
          <img src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png" alt="image" loading="lazy" width="" height="">
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Imdb Movie is carried out by passionate developers</h2>
          <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
          <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
        </div>
      </div>
  </div>
</div>



<section class="relative  bg-yellow-300">
<div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div class="absolute top-0 w-full h-full bg-center bg-cover" style="
            background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1267&amp;q=80');
          ">
          <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">
                  The story start with us.
                </h1>
                <p class="mt-4 text-lg text-blueGray-200">
                  This is our team ...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style="transform: translateZ(0px)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <section class="pb-10 bg-blueGray-200 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
          <!--*************************************************************************-->
          <section class="pt-20 pb-48">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold">Here are our heroes</h2>
            
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="https://lh3.googleusercontent.com/YiHxHCxngm1kn_yoHW45Utlrgy86ijRJDdnKS2zRgURzi-YgVKOEtNf6AHMNnFGYrmxrmLVxIwdR-gkU4euzV7B3h4vL6V3rLR6e0Fj8uND_MLJes6oT-EzuG5qyVD855qELsnPdJ2Iq0SbA6A"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px;"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Omar Deeb</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Frontend Developer
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-twitter"></i></button
                    ><button
                      class="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-facebook-f"></i></button
                    ><button
                      class="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="https://lh3.googleusercontent.com/YiHxHCxngm1kn_yoHW45Utlrgy86ijRJDdnKS2zRgURzi-YgVKOEtNf6AHMNnFGYrmxrmLVxIwdR-gkU4euzV7B3h4vL6V3rLR6e0Fj8uND_MLJes6oT-EzuG5qyVD855qELsnPdJ2Iq0SbA6A"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px;"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Nanor Gosdanian</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Web Specialist
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-google"></i></button
                    ><button
                      class="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="https://lh3.googleusercontent.com/YiHxHCxngm1kn_yoHW45Utlrgy86ijRJDdnKS2zRgURzi-YgVKOEtNf6AHMNnFGYrmxrmLVxIwdR-gkU4euzV7B3h4vL6V3rLR6e0Fj8uND_MLJes6oT-EzuG5qyVD855qELsnPdJ2Iq0SbA6A"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px;"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Muhammad Othman</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Frontend Developer
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-google"></i></button
                    ><button
                      class="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-twitter"></i></button
                    ><button
                      class="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="https://lh3.googleusercontent.com/YiHxHCxngm1kn_yoHW45Utlrgy86ijRJDdnKS2zRgURzi-YgVKOEtNf6AHMNnFGYrmxrmLVxIwdR-gkU4euzV7B3h4vL6V3rLR6e0Fj8uND_MLJes6oT-EzuG5qyVD855qELsnPdJ2Iq0SbA6A"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px;"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Roza Nawzad Salih</h5>
                  <p class="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Web Designer
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-dribbble"></i></button
                    ><button
                      class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-google"></i></button
                    ><button
                      class="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-twitter"></i></button
                    ><button
                      class="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
      </section>

      
`;
};

document.getElementById('about').addEventListener('click',renderabout);

document.addEventListener("DOMContentLoaded", autorun)

