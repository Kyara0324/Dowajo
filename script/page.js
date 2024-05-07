import { options } from "./fetch.js";

const URLSearch = new URLSearchParams(location.search);

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

const detailCard = document.getElementById("page");

function detailload() {
  fetch(
    `https://api.themoviedb.org/3/movie/${searchParam("id")}?language=ko-KR`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movie_title = response.title;
      const movie_vote = response.vote_average;
      const movie_date = response.release_date;
      const movie_overview = response.overview;
      const movie_runtime = response.runtime;
      const movie_id = response.id;
      const movie_poster_path = response.poster_path;

      const detail_contents = `<div class="cardBox" ${movie_id}">
            <div class="contentsBox">
              <img src='https://image.tmdb.org/t/p/w300${movie_poster_path}' alt="${movie_title}" class="poster">
              <ul class="title_ul">
              <li>${movie_title}</li>
              <li>• 개봉일 : ${movie_date}</li>
              <li>• 평점 : ${movie_vote}</li>
              <li>• 러닝타임 : ${movie_runtime}분</li>
              <li>${movie_overview}</li>
              </ul>
            </div> 
        </div>`;
      detailCard.innerHTML = detail_contents;
    });
}
detailload();
