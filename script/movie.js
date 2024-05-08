import { options } from "./fetch.js"; //fetch 가져오기

let lang = "ko-KR"; //기본 언어를 lang 이라는 변수에 저장
let langBtn = document.getElementById("lang_btn"); //lang_btn에 index 아이디 가져옴

langBtn.addEventListener("click", () => {
  lang = lang === "ko-KR" ? "en-US" : "ko-KR"; //ko-KR랑 같으면 앞의 en-US, 다르면 ko-KR
  Btn(); //버튼을 누를때마다 새로고침 되게 하기 위해 Btn이라는 함수를 넣음
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
                <p class="card_content">click!</p>
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
