"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const youtube_url = "https://www.youtube.com/embed/";
const CONTAINER = document.querySelector(".content_container");

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

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};
const fetchMoviesByGenres = async (genreId) => {
  const url = constructUrl(`/discover/movie`) + `&with_genres=${genreId}`;
  const res = await fetch(url);
  return res.json();
};
const renderMoviesByGeners = async (genreId) => {
  const result = await fetchMoviesByGenres(genreId);
  renderMovies(result.results);
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const fetchVideo = async (movieId) => {
  const url = constructUrl(`/movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
};
const videoDetailes = async (movieId) => {
  const movieRes = await fetchVideo(movieId);
  return renderVideo(movieRes);
};
const renderVideo = (movie_res) => {
  const link = youtube_url + movie_res.results[0].key;
  return link;
};
const numberFormatter = (num) => {
  return num < 999
    ? num
    : num < 1000000
    ? Math.sign(num) * (num / 1000).toFixed(1) + "K"
    : num < 1000000000
    ? Math.sign(num) * (num / 1000000).toFixed(1) + "M"
    : Math.sign(num) * (num / 1000000000).toFixed(1) + "B";

  // Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k";
};
const getCompanies = (comapnies) => {
  return comapnies.reduce((prev, curr, index) => {
    if (comapnies.length - 1 != index) {
      return prev + curr.name + " ,";
    } else {
      return prev + curr.name;
    }
  }, " ");
};
const getGenres = (genres) => {
  return genres.reduce((prev, curr, index) => {
    if (genres.length - 1 != index) {
      return prev + curr.name + " ,";
    } else {
      return prev + curr.name;
    }
  }, " ");
};
const fetchCredits = async (movieId) => {
  const url = constructUrl(`/movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};
const fetchNowPlaying = async () => {
  const url = constructUrl(`/movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};
const renderNowPlaying = async () => {
  const res = await fetchNowPlaying();
  renderMovies(res.results);
};
const fetchPopular = async () => {
  const url = constructUrl(`/movie/popular`);
  const res = await fetch(url);
  return res.json();
};
const renderPopular = async () => {
  const res = await fetchPopular();
  renderMovies(res.results);
};
const fetchTopRated = async () => {
  const url = constructUrl(`/movie/top_rated`);
  const res = await fetch(url);
  return res.json();
};
const renderTopRated = async () => {
  const res = await fetchTopRated();
  renderMovies(res.results);
};
const fetchUpComing = async () => {
  const url = constructUrl(`/movie/upcoming`);
  const res = await fetch(url);
  return res.json();
};
const renderUpComing = async () => {
  const res = await fetchUpComing();
  renderMovies(res.results);
};
const fetchActor = async (actorId) => {
  const url = constructUrl(`/person/${actorId}`);
  const res = await fetch(url);
  return res.json();
};
const actorDetails = async (actorId) => {
  const result = await fetchActor(actorId);
  renderActor(result);
};
const getDirector = async (movieId) => {
  const results = await fetchCredits(movieId);
  const directorDetailes = results.crew.find((element) => {
    return element.job === "Director";
  });
  return directorDetailes;
};
const getActors = async (movieId) => {
  const results = await fetchCredits(movieId);
  const actors = results.cast.filter((element, index) => {
    return index < 5;
  });
  return actors;
};
const fetchSimilarMovie = async (movieId) => {
  const url = constructUrl(`/movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};
const getSimilarMovies = async (movieId) => {
  const movies = await fetchSimilarMovie(movieId);
  return movies.results;
};
const fetchActorMovies = async (actorId) => {
  const url = constructUrl(`/person/${actorId}/movie_credits`);
  const res = await fetch(url);
  return res.json();
};
const getActorMovies = async (actorId) => {
  const movies = await fetchActorMovies(actorId);
  return actorsMoviesDivMaker(movies);
};
const fetchActors = async () => {
  const url = constructUrl(`/person/popular`);
  const res = await fetch(url);
  return res.json();
};
const getLatestActors = async () => {
  const actorsList = await fetchActors();
  renderActors(actorsList.results);
};
const renderActors = async (actors) => {
  const divForActors = document.createElement("div");
  divForActors.classList.add(
    "mt-5",
    "gap-5",
    "grid",
    "grid-cols-2",
    "sm:grid-cols-3",
    "lg:grid-cols-4",
    "xl:grid-cols-5",
    "col-span-3"
  );
  actors.map((actor) => {
    //get profile pic if its null replace it will profile icon image
    const profilePic =
      actor.profile_path != null
        ? PROFILE_BASE_URL + actor.profile_path
        : "images/profile.webp";

    const divForActor = document.createElement("div");
    divForActor.innerHTML = `
    <div class="flex">
        <img src="${profilePic}" alt="${actor.name} profile image" class="h-28 w-20 object-cover object-center rounded-md cursor-pointer" />
    <div class="flex flex-col ml-2">
        <div class="mt-5 cursor-pointer text-customYellow"><a href="#">${actor.name}<a/></div>
      </div>
    </div>`;
    // actorDetails
    divForActor.addEventListener("click", () => {
      actorDetails(actor.id);
    });
    divForActors.appendChild(divForActor);
  });
  CONTAINER.innerHTML = "";
  CONTAINER.appendChild(divForActors);
};
const actorsMoviesDivMaker = (movies) => {
  const actorsMoviesDiv = document.createElement("div");
  actorsMoviesDiv.setAttribute("id", "actorMovies");
  actorsMoviesDiv.classList.add(
    "flex",
    "overflow-x-scroll",
    "space-x-5",
    "py-1",
    "scroll-smooth",
    "scrollbar-hide"
  );
  movies.cast.map((movie) => {
    const actorMovieDiv = document.createElement("div");
    actorMovieDiv.classList.add(
      "shrink-0",
      "w-64",
      "group",
      "hover:scale-95",
      "transition"
    );
    let poster = "";
    movie.poster_path !== null
      ? (poster = BACKDROP_BASE_URL + movie.poster_path)
      : (poster = "images/poster.jpg");
    actorMovieDiv.innerHTML = `
    <div class="relative">
      <img src="${poster}" alt="" class="h-96 cursor-pointer" />
      <div class="w-full h-full bg-transparent transition group-hover:bg-customBlack/20 top-0 left-0 absolute z-10 cursor-pointer"></iv>
    </div>
    <h1 class="mt-2 ml-1 text-lg cursor-pointer">${movie.title.slice(
      0,
      50
    )}</h1>
    <div class="text-customWhite flex items-center ml-1">
        <i class="fa-solid fa-star ml-0.5 mr-1 text-xs text-customYellow"></i>${movie.vote_average.toFixed(
          1
        )} 
        <div class="text-customBlue ml-3">${movie.release_date}</div>
        </div>
    `;
    actorMovieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    actorsMoviesDiv.appendChild(actorMovieDiv);
  });
  return actorsMoviesDiv;
};
const renderActor = async (actor) => {
  const actorsMovies = await getActorMovies(actor.id);
  let deathday = "";
  actor.deathday != null ? (deathday = actor.deathday) : (deathday = "Now");
  CONTAINER.innerHTML = `
    <div class="col-span-3 flex flex-col">
      <div class="shrink-0 relative">
        <img id="movie-backdrop" class="h-128 rounded-lg mx-auto shadow-md shadow-customYellow" src=${
          PROFILE_BASE_URL + actor.profile_path
        }>
      </div>
      <div class="space-y-2">
        <h2 id="actor-name" class="text-3xl font-bold mt-5">
        ${actor.name}
        </h2>
        <p id="actor-bio" class="">${actor.biography}</p>
        <div class="border-b-2 border-customGray w-full"></div>
        <p id="actor-birthday" class="text-customBlue"><b class="text-customWhite">Birthday:</b> ${
          actor.birthday
        } - ${deathday}</p> 
        <div class="border-b-2 border-customGray w-full"></div>
        <p id="actor-popularity" class="text-customBlue"><b class="text-customWhite">Popularity:</b> ${actor.popularity.toFixed(
          1
        )}</p> 
        <div class="border-b-2 border-customGray w-full"></div>
        <p id="actor-placeofbirth" class="text-customBlue"><b class="text-customWhite">Place of birth:</b> ${
          actor.place_of_birth
        }</p> 
        <div class="border-b-2 border-customGray w-full"></div>
        <p id="actor-knownFor" class="text-customBlue"><b class="text-customWhite">Known for:</b> ${
          actor.known_for_department
        }</p> 
      </div>
      <div class="flex items-center px-2 mt-10 mb-5 h-8 border-l-2 border-customYellow text-xl">Actor movies</div>
      <div class="relative" id="actorsMoviesContainer">
        <div id="moveLeft" class="absolute top-1/2 left-0 z-20 w-12 py-2 bg-gradient-to-r from-customBlack to-transparent -translate-y-16 flex items-center justify-start cursor-pointer hover:text-customYellow">
          <i class="fa-solid fa-angle-left text-5xl"></i>
        </div>
        <div id="moveRight" class="absolute top-1/2 right-0 z-20 w-12 py-2 bg-gradient-to-l from-customBlack to-transparent -translate-y-16 flex items-center justify-end cursor-pointer hover:text-customYellow">
          <i class="fa-solid fa-angle-right text-5xl"></i>
        </div>
      </div>
    <div>
  `;
  const actorMoviesDiv = CONTAINER.querySelector("#actorsMoviesContainer");
  actorMoviesDiv.appendChild(actorsMovies);
  const scrollLeft = CONTAINER.querySelector("#moveLeft");
  const scrollRight = CONTAINER.querySelector("#moveRight");
  scrollLeft.addEventListener("click", () => {
    const left = CONTAINER.querySelector("#actorMovies");
    left.scrollBy(-1380, 0);
  });
  scrollRight.addEventListener("click", () => {
    const right = CONTAINER.querySelector("#actorMovies");
    right.scrollBy(1380, 0);
  });
};
const similarMovieDivMaker = async (movieId) => {
  const movies = await getSimilarMovies(movieId);
  const divForMovies = document.createElement("div");
  divForMovies.setAttribute("id", "relatedMovies");
  divForMovies.classList.add(
    "flex",
    "overflow-x-scroll",
    "space-x-5",
    "py-1",
    "scroll-smooth",
    "scrollbar-hide"
  );
  movies.map((movie) => {
    const divForMovie = document.createElement("div");
    divForMovie.classList.add(
      "shrink-0",
      "w-64",
      "group",
      "hover:scale-95",
      "transition"
    );
    divForMovie.innerHTML = `
    <div class="relative">
      <img src="${
        BACKDROP_BASE_URL + movie.poster_path
      }" alt="" class="h-96 cursor-pointer" />
      <div class="w-full h-full bg-transparent transition group-hover:bg-customBlack/20 top-0 left-0 absolute z-10 cursor-pointer"></iv>
    </div>
    <h1 class="mt-2 ml-1 text-lg cursor-pointer">${movie.title}</h1>
    <div class="text-customWhite flex items-center ml-1">
        <i class="fa-solid fa-star ml-0.5 mr-1 text-xs text-customYellow"></i>${movie.vote_average.toFixed(
          1
        )} 
        <div class="text-customBlue ml-3">${movie.release_date}</div>
        </div>
    `;
    divForMovie.addEventListener("click", () => {
      movieDetails(movie);
    });
    divForMovies.appendChild(divForMovie);
  });
  return divForMovies;
};
const actorsDivMaker = (actors) => {
  const divForActors = document.createElement("div");
  divForActors.classList.add(
    "mt-5",
    "gap-5",
    "grid",
    "grid-cols-2",
    "sm:grid-cols-3",
    "lg:grid-cols-4",
    "xl:grid-cols-5"
  );
  actors.map((actor) => {
    //get profile pic if its null replace it will profile icon image
    const profilePic =
      actor.profile_path != null
        ? PROFILE_BASE_URL + actor.profile_path
        : "images/profile.webp";

    const divForActor = document.createElement("div");
    divForActor.innerHTML = `
    <div class="flex">
        <img src="${profilePic}" alt="${
      actor.name
    } profile image" class="h-28 w-20 object-cover object-center rounded-md cursor-pointer" />
    <div class="flex flex-col ml-2">
        <div class="mt-5 cursor-pointer text-customYellow"><a href="#">${
          actor.name
        }<a/></div>
        <div class="">${actor.character.slice(
          0,
          actor.character.indexOf("/")
        )}</div>
      </div>
    </div>`;
    // actorDetails
    divForActor.addEventListener("click", () => {
      actorDetails(actor.id);
    });
    divForActors.appendChild(divForActor);
  });
  return divForActors;
};
const renderAboutUs = () => {
  CONTAINER.innerHTML = `
  <div class="col-span-3"> 
      <div class="flex mx-auto text-center flex-col"> 
      <p>RMDb (Recoded Movie Database) is an online database of information related to films. <br>
      including cast, production crew and personal biographies.</p>
      <img src="images/logo.png" class="h-64 w-auto mx-auto mt-5">
      </div>
  </div>
  `;
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML = " ";
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add(
      "relative",
      "group",
      "hover:cursor-pointer",
      "transition",
      "rounded-md",
      "overflow-hidden"
    );
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
    <div class="absolute w-full h-full bg-gradient-to-t from-customBlack/100
     via-customBlack/20 to-transparent group-hover:to-customBlack/20
     group-hover:via-customBlack/30 transition-colors z-10 left-0 top-0"></div>
     <div class="absolute bottom-2 left-3 z-20 border-l-2 border-customYellow px-2">
        <h3 class="text-4xl md:text-3xl text-customWhite ">${movie.title}</h3>
        <div class="text-customWhite flex items-center">
        <i class="fa-solid fa-star ml-0.5 mr-1 text-xs text-customYellow"></i>${movie.vote_average.toFixed(
          1
        )} 
        <div class="text-customBlue ml-3">${movie.release_date}</div>
        </div>
        </div>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = async (movie) => {
  const videoFrameLink = await videoDetailes(movie.id);
  const companyNames = getCompanies(movie.production_companies);
  const genres = getGenres(movie.genres);
  const director = await getDirector(movie.id);
  const actors = await getActors(movie.id);
  const actorsDiv = actorsDivMaker(actors);
  const similarMoviesDiv = await similarMovieDivMaker(movie.id);
  CONTAINER.innerHTML = `
        <div class="flex flex-col col-span-3 space-y-10 lg:space-x-6 lg:space-y-0 lg:flex-row lg:space-x-2 w-full">
          <div class="relative shrink-0">
            <img id="movie-backdrop" class="h-128 rounded-lg mx-auto lg:mx-0 shadow-sm shadow-customYellow" src=${
              BACKDROP_BASE_URL + movie.poster_path
            }>
            <div class="absolute -bottom-6 right-1/2 border-2 border-customYellow translate-x-1/2 bg-customBlack py-2 px-7 rounded-full">
              <div class="flex items-center">
              <i class="fa-solid fa-star mr-2 mr-1 text-xl text-customYellow"></i>
                <div class="flex flex-col">
                  <div class="flex items-center h-min">
                    <span class="font-bold text-lg leading-4">
                      ${movie.vote_average.toFixed(1)}
                    </span>
                    <span class="font-light leading-4 ">/10</span>
                  </div>
                  <div class="font-light leading-4 mt-0.5">${numberFormatter(
                    movie.vote_count
                  )}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-customWhite space-y-2 lg:pt-5">
            <h2 id="movie-title" class="text-3xl">${movie.title}</h2>
            <p id="movie-overview" class="">${movie.overview}</p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-genres" class="text-customBlue"><b class="text-customWhite">Genres:</b> ${genres}</p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-release_date" class="text-customBlue"><b class="text-customWhite">Release Date:</b> ${
              movie.release_date
            }</p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-runtime" class="text-customBlue"><b class="text-customWhite">Runtime:</b> ${
              movie.runtime
            } Minutes</p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-language" class="text-customBlue"><b class="text-customWhite">Language:</b> ${
              movie.original_language
            }</p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-director" class="text-customBlue"><b class="text-customWhite">Directer:</b> ${
              director.original_name
            }</p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-production_companies" class="text-customBlue"><b class="text-customWhite">Companies:</b> 
            ${companyNames}
            </p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-budget" class="text-customBlue"><b class="text-customWhite">Budget:</b> 
            ${numberFormatter(movie.budget)}
            </p>
            <div class="border-b-2 border-customGray w-full"></div>
            <p id="movie-revenue" class="text-customBlue"><b class="text-customWhite">Revenue:</b> 
            ${numberFormatter(movie.revenue)}
            </p>
        </div>
      </div>
      <div class="col-span-3">
        <div class="flex items-center px-2 mt-8 h-8 border-l-2 border-customYellow text-xl">Top cast</div>
        <div id="movie-actors" class=""></div>
        <div class="flex items-center px-2 mt-8 mb-5 h-8 border-l-2 border-customYellow text-xl">Trailer</div>
        <div class="relative pb-[56.25%] w-full mx-auto">
          <iframe src="${videoFrameLink}" class="absolute w-full h-full top-0 left-0 "
          frameborder="0"></iframe>
        </div>
        <div class="flex items-center px-2 mt-10 mb-5 h-8 border-l-2 border-customYellow text-xl">More like this</div>
        <div id="similar-movies" class="relative">
        <div id="moveLeft" class="absolute top-1/2 left-0 z-20 w-12 py-2 bg-gradient-to-r from-customBlack to-transparent -translate-y-16 flex items-center justify-start cursor-pointer hover:text-customYellow">
          <i class="fa-solid fa-angle-left text-5xl "></i>
        </div>
        <div id="moveRight" class="absolute top-1/2 right-0 z-20 w-12 py-2 bg-gradient-to-l from-customBlack to-transparent -translate-y-16 flex items-center justify-end cursor-pointer hover:text-customYellow">
          <i class="fa-solid fa-angle-right text-5xl "></i>
        </div>
        </div>
      </div>`;
  const actordiv = CONTAINER.querySelector("#movie-actors");
  actordiv.appendChild(actorsDiv);
  const similormoviediv = CONTAINER.querySelector("#similar-movies");
  similormoviediv.appendChild(similarMoviesDiv);
  const scrollLeft = CONTAINER.querySelector("#moveLeft");
  const scrollRight = CONTAINER.querySelector("#moveRight");
  scrollLeft.addEventListener("click", () => {
    const left = CONTAINER.querySelector("#relatedMovies");
    left.scrollBy(-1380, 0);
  });
  scrollRight.addEventListener("click", () => {
    const right = CONTAINER.querySelector("#relatedMovies");
    right.scrollBy(1380, 0);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  autorun();
});

const genre_btn = document.getElementById("movieGenresDropdown");
const home = document.getElementById("home_btn");
const actors_btn = document.getElementById("actors_btn");
const now_playing = document.getElementById("now_playing");
const populer = document.getElementById("populer");
const topRated = document.getElementById("topRated");
const upCaming = document.getElementById("upCaming");
const menu_btn = document.getElementById("menu_btn");
const aboutUs = document.getElementById("aboutUs");
actors_btn.addEventListener("click", () => {
  getLatestActors();
});
aboutUs.addEventListener("click", () => {
  renderAboutUs();
});
genre_btn.addEventListener("click", async (e) => {
  const genre_id = e.target.id;
  renderMoviesByGeners(genre_id);
});
home.addEventListener("click", () => {
  autorun();
});
now_playing.addEventListener("click", () => {
  renderNowPlaying();
});
populer.addEventListener("click", () => {
  renderPopular();
});
topRated.addEventListener("click", () => {
  renderTopRated();
});
upCaming.addEventListener("click", () => {
  renderUpComing();
});
const nav_menu = document.getElementById("nav_menu");
menu_btn.addEventListener("click", () => {
  nav_menu.classList.toggle("hidden");
});
