import {genres} from './throawyay.js'

const apiKey = "2221f5ab34e5aca118a219c9b49996b2";
const apiLink = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

function handleError(err){
    console.log('ERROR!');
    console.log(err);
}

const movies = fetch(apiLink);
movies.then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    console.log(data.results)
    console.log(data.results[0].genre_ids)
    let i;
    //How many movies are shown
    for (i = 0; i < data.results.length; i++){
        let x;
        //How many genres are shown in THAT movie
        for (x = 0; x < data.results[i].genre_ids.length; x++){
            console.log(data.results[i].genre_ids[x])
            let n;
            for (n = 0; n < genres.length; n++){
                if (data.results[i].genre_ids[x] === genres[n].id){
                    console.log('ok')
                    console.log(genres[n].name)
                    data.results[i].genre_ids[x] = ' '+ genres[n].name
                }else{
                }
            }
        }
    }
    data.results.forEach(movie => document.getElementById('movie-grid').insertAdjacentHTML("beforeend", `<div class="movie-card">
    <div class="movie-card-front">
      <img
        src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
        alt=""
        class="poster"
      />
    </div>
    <div class="movie-card-back">
      <h3 class="movie-card-header">${movie.original_title}</h3>
      <div class="score-box">
        <p class="user-score">Community Score</p>
        <p class="user-score">${movie.vote_average}</p>
      </div>

      <div class="release-box">
        <p class="release-date">Released</p>
        <p class="release-date">${movie.release_date}</p>
      </div>

      <div class="movie-genres">
        <li class="movie-genre">${movie.genre_ids}</li>
      </div>
    </div>
  </div>`))
}).catch(handleError);
