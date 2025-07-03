const data = JSON.parse(localStorage.getItem('watchlist'))
const movieContainer = document.getElementById('movie-container');
const movieContent = document.getElementById('movie-content');
const searchButton = document.getElementById('button');

console.log(data)

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
                        <button class="remove-btn" data-id="${movie.id}">Remove</button>
                    </div>
                    <p class="summ margin">${movie.summary}</p>
                </div>
            </div>
        `;
    });

    // 🧼 Simple remove logic
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const idToRemove = this.dataset.id;
            let currentList = JSON.parse(localStorage.getItem('watchlist')) || [];

            // 🔥 Filter out the movie by ID
            currentList = currentList.filter(movie => String(movie.id) !== String(idToRemove));

            // ✅ Save the updated list
            localStorage.setItem('watchlist', JSON.stringify(currentList));

            // 🔄 Re-render the updated list
            renderMovieDataTooPage();
        });
    });
}

renderMovieDataTooPage();




