const data = JSON.parse(localStorage.getItem('watchlist'));
const movieContainer = document.getElementById('movie-container');
const movieContent = document.getElementById('movie-content');
const searchButton = document.getElementById('button');

function renderMovieDataTooPage() {
    const data = JSON.parse(localStorage.getItem('watchlist')) || [];
    movieContainer.innerHTML = ''; 
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
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const idToRemove = this.dataset.id;
            let currentList = JSON.parse(localStorage.getItem('watchlist')) || [];

            currentList = currentList.filter(movie => movie.id !== idToRemove);
            localStorage.setItem('watchlist', JSON.stringify(currentList));
            renderMovieDataTooPage();
        });
    });
}

renderMovieDataTooPage();




