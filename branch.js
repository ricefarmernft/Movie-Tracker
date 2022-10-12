// QUERY SELECTORS VARIABLES
const form = document.querySelector("#movie-form");
const movieSelect = document.querySelector("#movie-name");
const rating = document.querySelector("#rating-score");
const list = document.querySelector("#movie-list");
const ratingList = document.querySelector("#title");
const dropdownBtn = document.querySelector("#plot-btn");
const sortRatingHigh = document.querySelector(".sort-rating-high");
const sortRatingLow = document.querySelector(".sort-rating-low");
const SortAlphabeticalHigh = document.querySelector(".sort-alphabetical-high");
const SortAlphabeticalLow = document.querySelector(".sort-alphabetical-low");
const directorList = document.querySelector("#director-list");

// CREATE LOCAL STORAGE ARRAY
let movies = JSON.parse(localStorage.getItem("allMovies")) || [];

// 'LOAD' LOCAL STORAGE MOVIE DATA
window.addEventListener("load", (event) => {
  event.preventDefault();
  getMovie();
  // Get Director list dropdown
  // liDirector(allDirectors, directorList);
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
  // SORT RATING HIGH TO LOW
  sortRatingHigh.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedMovies = movies.sort((a, b) => {
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
  // SORT RATING LOW TO HIGH
  sortRatingLow.addEventListener("click", (event) => {
    event.preventDefault();
    const sortedMovies = movies.sort((a, b) => {
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
    localStorage.setItem("allMovies", JSON.stringify(sortedMovies));
    getMovie();
  });
  // SORT ALPHABETICAL A-Z
  SortAlphabeticalHigh.addEventListener("click", (event) => {
    event.preventDefault();
    const alphaMovies = movies.sort((a, b) => {
      let aTitle = a.title.replace("The ", "").toLowerCase();
      let bTitle = b.title.replace("The ", "").toLowerCase();
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
  // SORT ALPHABETICAL Z-A
  SortAlphabeticalLow.addEventListener("click", (event) => {
    event.preventDefault();
    const alphaMovies = movies.sort((a, b) => {
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
});

// GET MOVIE DATA FROM API
const getMovie = async (moviename) => {
  if (moviename) {
    // CREATE RATING VARIABLE
    let myRating = rating.value;
    // FETCH API DATA
    const response = await fetch(
      `https://www.omdbapi.com/?t=${moviename}&apikey=22028cd0`
    );
    const data = await response.json();
    // RETURN API DATA
    console.log(data.Error);
    // IF API DOES NOT RETURN A MOVIE
    if (data.Error) {
      alert("Movie Not Found!");
    } else {
      // ADD NEW MOVIE DATA
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
    // JUST LOAD ALL MOVIES IF NO MORE DATA TO ADD
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
  const myScore = document.createElement("div");
  myScore.innerHTML = `${movieRating}`;
  myScore.classList = "rating-style";
  taskDiv.appendChild(myScore);
  // CREATE MOVIE INFO DIV
  const movieDiv = document.createElement("div");
  movieDiv.innerHTML = `<strong>${movieTitle}</strong> ${movieYear}<br><span class="genre">${movieGenre}</span>`;
  movieDiv.classList = "list-style";
  // ADD MOVIE INFO DIV TO TASK DIV
  taskDiv.appendChild(movieDiv);
  // CREATE BUTTON DIV
  const buttonDiv = document.createElement("div");
  buttonDiv.classList = "button-div";
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
  const plotInfo = document.createElement("div");
  plotInfo.innerHTML = `<strong>Director:</strong> ${movieDirector}<br><strong>Actors:</strong> ${movieActors}<br><strong>Plot:</strong> ${moviePlot}`;
  plotInfo.classList.add("dropdown-content");
  // ADD PLOT INFO DROPDOWN DIV TO ACTION DIV
  actionDiv.append(plotInfo);
  // ADD DELETE BUTTON FUNCTION
  delBtn.addEventListener("click", (event) => {
    // REMOVE TASK DIV FROM MOVIE DATA
    list.removeChild(taskDiv);
    // UPDATE LOCAL STORAGE TO REMOVE MOVIE DATA
    let adjMovies = movies.filter((t) => t.title != movieTitle);
    localStorage.setItem("allMovies", JSON.stringify(adjMovies));
    localStorage.removeItem("movies");
  });
  // PLOT DROPDOWN BUTTON FUNCTION
  plotBtn.addEventListener("click", (event) => {
    plotInfo.classList.toggle("show");
  });
};


// LIST OF ALL DIRECTORS
// Function: Split API data.director into 1 Array with every Director 
const directorArray = (number) =>
  movies.map((movie) => {
    return movie.director.split(", ")[number];
  });
  // Function: Return if multiple Directors
const directorArr = (number) =>
  directorArray(number).filter((director) => {
    return director != undefined;
  });
// Combine all Directors
const finalDirector = [
  ...directorArr(0),
  ...directorArr(1),
  ...directorArr(3),
];
// Get rid of duplicates
let allDirectors = [...new Set(finalDirector)];
// Sort Director list A-Z
allDirectors = allDirectors.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
});
// Create Director dropdown list
let liDirector = (data) => {
  if(data) {
    data.forEach(item => {
    // Create LI for each Director
    const createDir = document.createElement("li")
    createDir.classList.add("diretor-item")
    createDir.innerHTML = `${item}`;
    directorList.append(createDir)
    // Create checkbox for each Director
    const createCheckbox = document.createElement("input")
    createCheckbox.classList.add("checkbox")
    createCheckbox.type = "checkbox"
    createDir.append(createCheckbox)
    });
  }
}
// Perform function
liDirector(allDirectors);

// Filter Data Function
const directorInput = document.querySelector("#director-input")
const isChecked = document.querySelector(".checkbox")

let displayChecked = () => {
  if (isChecked.checked) {
    console.log("hello");
  }
}

isChecked.addEventListener("change", event => {
  if (event.target.checked === true) {
    console.log("hello");
  }
})