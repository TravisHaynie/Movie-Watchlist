const data = JSON.parse(localStorage.getItem('watchlist'));
const movieContainer = document.getElementById('movie-container');
const movieContent = document.getElementById('movie-content');
const searchButton = document.getElementById('button');

function renderMovieDataTooPage() {
    const data = JSON.parse(localStorage.getItem('watchlist')) || [];
    movieContainer.innerHTML = ''; 

    data.forEach((movie) => {
        movieContainer.innerHTML += `
            <div class="content-wrapper">
                <div class="img-container">
                    <img class="movie-img" src="${movie.img}">
                </div>
                <div class="movie-content-container">
                    <h2 class="name margin">${movie.title}</h2>
                    <p class="rate margin">⭐ ${movie.rating}</p>
                    <p class="genre margin">${movie.genre}</p>
                    <p class="time margin">${movie.runtime}</p>
                    <div class="btn">
                        <button class="remove-btn" data-id="${movie.id}">-</button>
                    </div>
                    <p class="summ margin">${movie.summary}</p>
                </div>
            </div>
        `;
    });

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




