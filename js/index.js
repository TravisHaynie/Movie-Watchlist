const movieContainer = document.getElementById('movie-container');
const searchButton = document.getElementById('button');

searchButton.addEventListener('click', getOmdbMovieData);

async function getOmdbMovieData() {
    const searchBar = document.getElementById('search-bar');
    const title = searchBar.value;
    movieContainer.innerHTML = '';

    const res = await fetch(`http://www.omdbapi.com/?apikey=311fbec3&s=${encodeURIComponent(title)}`);
    const data = await res.json();
    const movies = data.Search.slice(0, 3);

    let renderMovie = '';

    for (let movie of movies) {
        const details = await fetch(`http://www.omdbapi.com/?apikey=311fbec3&i=${movie.imdbID}`);
        const id = await details.json();

        renderMovie += `
            <div class="content-wrapper">
                <div class="img-container">
                    <img class="movie-img" src="${id.Poster}">
                </div>
                <div class="movie-content-container">
                    <h2 class="name margin">${id.Title}</h2>
                    <p class="rate margin">⭐ ${id.imdbRating}</p>
                    <p class="genre margin">${id.Genre}</p>
                    <p class="time margin">${id.Runtime}</p>
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
                        <p class="watchlist margin">Watchlist</p>
                    </div>
                    <p class="summ margin">${id.Plot}</p>
                </div>
            </div>
        `;
    }

    movieContainer.innerHTML = renderMovie;

    const watchlistButtons = document.querySelectorAll('.watchlist-btn');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const movieObj = {
                id: this.dataset.id,
                title: this.dataset.title,
                rating: this.dataset.rating,
                img: this.dataset.img,
                summary: this.dataset.plot,
                genre: this.dataset.genre,
                runtime: this.dataset.runtime
            };

            const currentList = JSON.parse(localStorage.getItem('watchlist')) ;
            currentList.push(movieObj);
            localStorage.setItem('watchlist', JSON.stringify(currentList));
        });
    });
}
