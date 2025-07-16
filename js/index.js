const movieContainer = document.getElementById("movie-container");
const searchButton = document.getElementById("button");
const modal = document.getElementById("modal");

// Search Event Triggered
searchButton.addEventListener("click", getOmdbMovieData);

async function getOmdbMovieData() {
  const searchBar = document.getElementById("search-bar");
  const title = searchBar.value;
  movieContainer.innerHTML = "";
  // Fetched Movie Title
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=311fbec3&s=${encodeURIComponent(title)}`
    );
    const data = await res.json();
    const movies = data.Search.slice(0, 3);

    let renderMovie = "";
    // Looping over fetched movie title data and calling for a second fetch with movies ID for more detail
    for (let movie of movies) {
      const details = await fetch(
        `https://www.omdbapi.com/?apikey=311fbec3&i=${movie.imdbID}`
      );
      const id = await details.json();

      renderMovie += `
            <div class="content-wrapper">
                <div class="img-container">
                    <img class="movie-img" src="${id.Poster}">
                </div>
                <div class="movie-content-container">
                    <h2 class="name margin">${id.Title}</h2>
                    <p class="rate margin font-size">⭐${id.imdbRating}</p>
                    <p class="genre margin font-size">${id.Genre}</p>
                    <p class="time margin font-size">${id.Runtime}</p>
                    <div class="btn">
                        <button class="watchlist-btn"
                            type="button"
                            data-id="${id.imdbID}"
                            data-title="${id.Title}"
                            data-rating="${id.imdbRating}"
                            data-runtime="${id.Runtime}"
                            data-genre="${id.Genre}"
                            data-img="${id.Poster}"
                            data-plot="${id.Plot}"
                        >+</button>
                        <p class="margin font-size">Watchlist</p>
                    </div>
                    <p class="summ margin font-size">${id.Plot}</p>
                </div>
            </div>
        `;
    }

    movieContainer.innerHTML = renderMovie;
    // Add movie to watchlist logic
    const watchlistButtons = document.querySelectorAll(".watchlist-btn");
    watchlistButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const movieObj = {
          id: this.dataset.id,
          title: this.dataset.title,
          rating: this.dataset.rating,
          img: this.dataset.img,
          summary: this.dataset.plot,
          genre: this.dataset.genre,
          runtime: this.dataset.runtime,
        };

        const currentList = JSON.parse(localStorage.getItem("watchlist")) || [];
        // Returns ture/false if movie is in watchlist
        const alreadAddedMovie = currentList.some(
          (movie) => movie.id === movieObj.id
        );
        // conditional set if movie is currently in watchlist
        if (alreadAddedMovie) {
          // modal content
          modal.innerHTML = "Already in Watchlist";
          modal.style.display = "flex";
          setTimeout(() => {
            modal.style.display = "none";
          }, 2000);
          return;
        }

        currentList.push(movieObj);
        localStorage.setItem("watchlist", JSON.stringify(currentList));
        // modal content
        modal.innerHTML = "added to watchlist";
        modal.style.display = "flex";

        setTimeout(() => {
          modal.style.display = "none";
        }, 2000);
      });
    });
  } catch (err) {
    console.log(err);
    movieContainer.innerHTML = `<div class="catch-err-message">Unable to find what your looking for.Please try another search</div>`;
  }
}


