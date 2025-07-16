const movieContainer = document.getElementById("movie-container");

function renderMovieDataToPage() {
  const data = JSON.parse(localStorage.getItem("watchlist")) || [];
  movieContainer.innerHTML = "";
  // LocalStorage data rendered to page
  data.forEach((movie) => {
    movieContainer.innerHTML += `
            <div class="content-wrapper">
                <div class="img-container">
                    <img class="movie-img" src="${movie.img}">
                </div>
                <div class="movie-content-container">
                    <h2 class="name margin">${movie.title}</h2>
                    <p class="rate margin font-size">⭐ ${movie.rating}</p>
                    <p class="genre margin font-size">${movie.genre}</p>
                    <p class="time margin font-size">${movie.runtime}</p>
                    <div class="btn">
                        <button class="remove-btn" data-id="${movie.id}">-</button>
                        <p class="watchlist margin font-size">Remove</p>
                    </div>
                    <p class="summ margin font-size">${movie.summary}</p>
                </div>
            </div>
        `;
  });
  // Remove Button logic
  // Get all of the buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  // Add click event on buttons
  removeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // get moivie id
      const movieId = this.dataset.id;
      // get watchlist data from localstorage
      let watchlistData = JSON.parse(localStorage.getItem("watchlist")) || [];
      // applying filter method to check for movie ids that do not match
      watchlistData = watchlistData.filter(function (movie) {
        return movie.id !== movieId;
      });
      // update local storage
      localStorage.setItem("watchlist", JSON.stringify(watchlistData));
      renderMovieDataToPage();
    });
  });
}

renderMovieDataToPage();
