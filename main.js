// QUERY SELECTORS HTML
const form = document.querySelector("#movie-form");
const movieSelect = document.querySelector("#movie-name");
const rating = document.querySelector("#rating-score");
const list = document.querySelector("#movie-list");
// QUERY SELECTORS SORTING
const sortRandom = document.querySelector(".sort-random");
const sortRatingHigh = document.querySelector(".sort-rating-high");
const sortRatingLow = document.querySelector(".sort-rating-low");
const SortAlphabeticalHigh = document.querySelector(".sort-alphabetical-high");
const SortAlphabeticalLow = document.querySelector(".sort-alphabetical-low");

// CREATE LOCAL STORAGE ARRAY
let movies = JSON.parse(localStorage.getItem("allMovies")) || [];

// 'LOAD' LOCAL STORAGE MOVIE DATA
window.addEventListener("load", (event) => {
  event.preventDefault();
  // Create Movie List
  getMovie();
  // SUBMIT NEW MOVIE DATA
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // EXECUTE getMovie FUNCTION IF MOVIE TITLE + RATING SUBMITTED
    if (movieSelect.value && rating.value) {
      getMovie(movieSelect.value);
      // CLEAR FORM
      movieSelect.value = "";
      rating.value = "";
      movieSelect.focus();
      // CONSOLE LOG SUCCESS IF MOVIE DATA ADDED
      console.log("success");
      // CONSOLE LOG ERROR IF MOVIE DATA NOT ADDED
    } else {
      console.log("error");
    }
  });
  // SORT RANDOM
  sortByRandom(movies);
  // SORT RATING HIGH TO LOW
  sortByRatingHigh(movies);
  // SORT RATING LOW TO HIGH
  sortByRatingLow(movies);
  // SORT ALPHABETICAL A-Z
  sortByAlphabeticalHigh(movies);
  // SORT ALPHABETICAL Z-A
  sortByAlphabeticalLow(movies);
});

// GET MOVIE DATA FROM API
const getMovie = async (moviename) => {
  if (moviename) {
    // RETURN ARRAY OF MOVIE TITLES
    let includedMovies = movies.map((movie) => {
      return movie.title;
    });
    // CREATE RATING VARIABLE
    let myRating = rating.value;
    // FETCH API DATA
    const response = await fetch(
      `https://www.omdbapi.com/?t=${moviename}&apikey=22028cd0`
    );
    const data = await response.json();
    // RETURN API DATA
    console.log(data);
    // IF API DOES NOT RETURN A MOVIE, ALERT ERROR
    if (data.Error) {
      alert("Movie Not Found!");
      // IF MOVIE ALREADY ADDED, ALERT ERROR
    } else if (includedMovies.includes(data.Title)) {
      alert("Movie already added!");
      // ADD NEW MOVIE DATA
    } else {
      addMovie(
        data.Title,
        myRating,
        data.Plot,
        data.Year,
        data.Genre,
        data.Actors,
        data.Director
      );
      // CREATE LOCAL STORAGE ARRAY DATA
      const storage = {
        title: data.Title,
        rating: myRating,
        plot: data.Plot,
        year: data.Year,
        genre: data.Genre,
        actors: data.Actors,
        director: data.Director,
      };
      // SAVE MOVIE DATA TO LOCAL STORAGE
      localStorage.setItem("movies", JSON.stringify(storage));
      movies.push(storage);
      localStorage.setItem("allMovies", JSON.stringify(movies));
    }
    // IF NO MOVIES ADDED, LOAD ALL MOVIES
  } else {
    movies.forEach((movie) => {
      addMovie(
        movie.title,
        movie.rating,
        movie.plot,
        movie.year,
        movie.genre,
        movie.actors,
        movie.director
      );
    });
  }
};

// ADD MOVIE DATA TO LIST
const addMovie = (
  movieTitle,
  movieRating,
  moviePlot,
  movieYear,
  movieGenre,
  movieActors,
  movieDirector
) => {
  // CREATE TASK DIV
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("tasks");
  // ADD TASK DIV TO MOVIE-LIST DIV, TOP FIRST
  list.insertBefore(taskDiv, list.children[0]);
  // CREATE RATING VALUE AND ADD TO TASK DIV
  const ratingDiv = document.createElement("div");
  ratingDiv.innerHTML = `${movieRating}`;
  ratingDiv.classList.add("rating-style");
  ratingDiv.classList.add(`rating-${movieRating * 10}`);
  taskDiv.appendChild(ratingDiv);
  // CREATE MOVIE INFO DIV
  const movieDiv = document.createElement("div");
  movieDiv.innerHTML = `<strong>${movieTitle}</strong> ${movieYear}<br><span class="genre">${movieGenre}</span>`;
  movieDiv.classList.add("list-style");
  // ADD MOVIE INFO DIV TO TASK DIV
  taskDiv.appendChild(movieDiv);
  // CREATE BUTTON DIV
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  // ADD BUTTON DIV TO TASK DIV
  taskDiv.appendChild(buttonDiv);
  // CREATE DELETE BUTTON
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-btn");
  delBtn.innerHTML = "Delete";
  // CREATE PLOT BUTTON
  const plotBtn = document.createElement("button");
  plotBtn.classList.add("plot-btn");
  plotBtn.innerHTML = "More";
  // ADD BUTTONS TO BUTTON DIV
  buttonDiv.appendChild(delBtn);
  buttonDiv.appendChild(plotBtn);
  // CREATE ACTION DIV
  const actionDiv = document.createElement("div");
  actionDiv.classList.add("actions");
  // ADD ACTION DIV TO TASK DIV
  taskDiv.append(actionDiv);
  // CREATE PLOT INFO DROPDOWN DIV
  const plotDiv = document.createElement("div");
  plotDiv.innerHTML = `<strong>Director:</strong> ${movieDirector}<br><strong>Actors:</strong> ${movieActors}<br><strong>Plot:</strong> ${moviePlot}`;
  plotDiv.classList.add("dropdown-content");
  // ADD PLOT INFO DROPDOWN DIV TO ACTION DIV
  actionDiv.append(plotDiv);
  // ADD DELETE BUTTON FUNCTION
  delBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // REMOVE TASK DIV FROM MOVIE DATA
    list.removeChild(taskDiv);
    // UPDATE LOCAL STORAGE TO REMOVE MOVIE DATA
    let adjMovies = movies.filter((t) => t.title != movieTitle);
    localStorage.setItem("allMovies", JSON.stringify(adjMovies));
    localStorage.removeItem("movies");
    window.location.reload(true);
  });
  // PLOT DROPDOWN BUTTON FUNCTION
  plotBtn.addEventListener("click", (event) => {
    plotDiv.classList.toggle("show");
  });
};

// Sorting functions
const sortByRandom = (array) => {
  sortRandom.addEventListener("click", (event) => {
    event.preventDefault();
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    localStorage.setItem("allMovies", JSON.stringify(array));
    getMovie();
  });
};
const sortByRatingHigh = (array) => {
  sortRatingHigh.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedMovies = array.sort((a, b) => {
      let aRating = parseFloat(a.rating, 10);
      let bRating = parseFloat(b.rating, 10);
      if (aRating < bRating) {
        return -1;
      }
      if (aRating > bRating) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem("allMovies", JSON.stringify(sortedMovies));
    getMovie();
  });
};

const sortByRatingLow = (array) => {
  sortRatingLow.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedMovies = array.sort((a, b) => {
      let aRating = parseFloat(a.rating, 10);
      let bRating = parseFloat(b.rating, 10);
      console.log(aRating);
      if (aRating < bRating) {
        return 1;
      }
      if (aRating > bRating) {
        return -1;
      }
      return 0;
    });
    console.log(sortedMovies);
    localStorage.setItem("allMovies", JSON.stringify(sortedMovies));
    getMovie();
  });
};

const sortByAlphabeticalHigh = (array) => {
  SortAlphabeticalHigh.addEventListener("click", (event) => {
    event.preventDefault();
    const alphaMovies = array.sort((a, b) => {
      let aTitle = a.title.replace("The ", "");
      let bTitle = b.title.replace("The ", "");
      if (aTitle < bTitle) {
        return 1;
      }
      if (aTitle > bTitle) {
        return -1;
      }
      return 0;
    });
    localStorage.setItem("allMovies", JSON.stringify(alphaMovies));
    getMovie();
  });
};

const sortByAlphabeticalLow = (array) => {
  SortAlphabeticalLow.addEventListener("click", (event) => {
    event.preventDefault();
    const alphaMovies = array.sort((a, b) => {
      let aTitle = a.title.replace("The ", "");
      let bTitle = b.title.replace("The ", "");
      if (aTitle < bTitle) {
        return -1;
      }
      if (aTitle > bTitle) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem("allMovies", JSON.stringify(alphaMovies));
    getMovie();
  });
};
