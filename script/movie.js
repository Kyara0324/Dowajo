import { options } from "./fetch.js";

let lang = "ko-KR";

let langBtn = document.getElementById("logn_btn");

langBtn.addEventListener("click", () => {
  lang = lang === "ko-KR" ? "en-US" : "ko-KR";
  Btn();
});

Btn();
function Btn() {
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movieData = response.results; //영화 데이터를 가져오기 위해 변수선언

      //html에 적용할 위치(id이름) 가져오기
      const movieCard = document.getElementById("card");

      //html에 들어갈 영화 카드 탬플릿 + 검색 값 세팅
      function movieList(val = "") {
        movieCard.innerHTML = movieData
          .map((data) => {
            if (data.title.toLowerCase().includes(val.toLowerCase())) {
              return `
          <div class="cardBox" onclick="alertCard(${data.id})">
          <a href="page.html?id=${data.id}">
              <div class="flip">
                <div class="front">
                <img src='https://image.tmdb.org/t/p/w300${data.poster_path}' alt="${data.title}">
                <h3>${data.title}</h3>
                </div>
              </div>  
              </a>
          </div>`;
            }
          })
          .join(""); //html 배열의 요소를 연결
      }
      movieList(); //함수 호출

      //검색한 값 가져오기 + 검색한 영화 출력하기
      const searchInput = document.getElementById("search");
      const searchBtn = document.getElementById("btn");

      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const val = searchInput.value;
        movieList(val);
      });
    });
}
/*
function alertCard(id) {
  //alert(`영화 ID : ${id}`);
  window.location.href = "page.html?" + id;
}
*/
