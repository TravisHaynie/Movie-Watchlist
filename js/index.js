const movieContainer = document.getElementById('movie-container');
const movieContent = document.getElementById('movie-content');
const searchButton = document.getElementById('button');

searchButton.addEventListener('click', getOmdbMovieData)

function getOmdbMovieData() {
    const searchBar = document.getElementById('search-bar');
    const title = searchBar.value;
    fetch(`http://www.omdbapi.com/?apikey=311fbec3&s=${encodeURIComponent(title)}&`)
        .then(res => res.json())
        .then(data => {
            const movies = data.Search.slice(0, 3);
            let renderMovie = ''
        
            for (let movie of movies) {
               fetch(`http://www.omdbapi.com/?apikey=311fbec3&i=${movie.imdbID}`)
               .then(res => res.json()) 
               .then(id => {
                console.log(id)
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
                            <button class="watchlist-btn" aria-label="Add to Watchlist">+</button>
                            <p class="watchlist margin">Watchlist</p>
                            </div>
                            <p class="summ margin">${id.Plot}</p>
                        </div>
                    </div>
                     `
                movieContainer.innerHTML = renderMovie

               })
           
            }
            
        }
        )
}
