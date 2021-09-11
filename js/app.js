const API_URL = "https://api.themoviedb.org/3/search/movie?api_key=a8b943da8269eafbc1c6a4522c91dffb&query="
const form = document.querySelector("form");
const search = document.querySelector(".header-search");


const genreList = [{
        id: 28,
        name: "Action"
    },
    {
        id: 12,
        name: "Adventure"
    },
    {
        id: 16,
        name: "Animation"
    },
    {
        id: 35,
        name: "Comedy"
    },
    {
        id: 80,
        name: "Crime"
    },
    {
        id: 99,
        name: "Documentary"
    },
    {
        id: 18,
        name: "Drama"
    },
    {
        id: 10751,
        name: "Family"
    },
    {
        id: 14,
        name: "Fantasy"
    },
    {
        id: 36,
        name: "History"
    },
    {
        id: 27,
        name: "Horror"
    },
    {
        id: 10402,
        name: "Music"
    },
    {
        id: 9648,
        name: "Mystery"
    },
    {
        id: 10749,
        name: "Romance"
    },
    {
        id: 878,
        name: "Science Fiction"
    },
    {
        id: 10770,
        name: "TV Movie"
    },
    {
        id: 53,
        name: "Thriller"
    },
    {
        id: 10752,
        name: "War"
    },
    {
        id: 37,
        name: "Western"
    }

]

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL}${search.value}`;
    if (search.value !== "") {
        getMovies(apiSearchUrl)
    }

    document.querySelector('.searchF').textContent = `Results for: ${search.value}`;
    search.value = '';


})

getMovies("https://api.themoviedb.org/3/movie/popular?api_key=a8b943da8269eafbc1c6a4522c91dffb&page=1")

function getClass(a) {
    if (a >= 7) {
        return "green"
    } else if (a > 5) {
        return "orange"
    } else {
        return "red"
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');
    moviesEl.innerHTML = '';
    data.results.forEach(element => {
                const movieEl = document.createElement('div');
                let posterUrl;
                if (element.poster_path) {
                    posterUrl = "https://image.tmdb.org/t/p/original" + element.poster_path;
                } else {
                    posterUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                }

                movieEl.classList.add('movie');
                movieEl.innerHTML = `
            <div class="movie-cover-inner">
            <img class="movie-cover" src="${posterUrl}" alt="" srcset="">
            <div class="movie-cover-darkened"></div>
        </div>
        <div class="movie-info">
            <div class="movie-title">${element.title}</div>
            <div class="movie-category">${element.genre_ids.map(
                (id)=> ` ${ genreList.find(x=>x.id === id).name }`
            )}</div>
            <div class="movie-rating movei-rating-${getClass(element.vote_average)}">${element.vote_average}</div>

        </div>`;
        moviesEl.appendChild(movieEl);
    });
}

function getMovies(url){
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData)
        showMovies(responseData)

    });
}