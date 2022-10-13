# Movie-Tracker

![Screen Shot 2022-10-12 at 12 31 58 PM](https://user-images.githubusercontent.com/112427358/195409850-38884b65-2e73-475c-a4bc-dfebfb08faec.png)

This is an interactive webpage that allows you to track movies that you have watched and assign a rating (0-10) to them, built using Javascript, HTML, CSS.

# How to Use
You need two inputs to create a movie entry. First, the Movie Name. Second, the Movie Rating from 0-10, which can include half points (.5). Occasionally, you may receive an alert "Movie Not Found!" if the Movie Name is not inputted correctly. Simply look up the full Movie Name and paste and that should resolve your issue.

# Additional Features
Movies are added indefinitely once inputs are entered in and "Submit" is clicked. Once a Movie Name and Movie Rating are inputted, a new entry will be created displaying the Movie Rating, Movie Name, Movie Year, and Movie Genre(s). Additionally, there is a "More" button. If clicked, it will display dropdown text including Movie Director(s), Movie Actors, and Movie Plot. You can also "Delete" any movie entrie with the red "Delete" button.

There are multiple ways to sort the movie entries. These include: Random, Rating, and Alphabetical.

# How It Works
The Movie Name input is crossreferenced with the Open Movie Database API (https://omdbapi.com/). We can fetch the necessary data from the API and display it on our Movie Tracker. Entries are automatically saved in Local Storage in order to repopulate once the app is closed and opened again.

# Video Demo
https://user-images.githubusercontent.com/112427358/195411820-fbeda006-3c80-4ee0-bbaf-0d844a9f05b6.mov

# Bugs / Upcoming Features
- Refresh when "Delete" button is clicked
- Disable duplicate movies added
- Create initial load page
- Hide Footer during Refresh runtime
- Autofill dropdown to filter by Genre, Director, Actor
- Light Mode
