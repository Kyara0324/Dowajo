//page.html id 불러오기
const reviewForm = document.getElementById("reviewForm");
const reviewDiv = document.getElementById("reviewDiv");

//page.htm 리뷰 작성 시 input 값 id 불러오기
const Id = document.getElementById("username");
const password = document.getElementById("pw");
const comment = document.getElementById("comment");

//query string으로 영화api데이터 가져오기
const URLSearch = new URLSearchParams(location.search);

//query string으로 담아놓고 영화id값을 get해서 가져오기
function searchParam(key) {
  return URLSearch.get(key);
}

//리뷰 input 값 localStorage에 저장하기 
function saveComments(newComment) {
  let comments = JSON.parse(localStorage.getItem("comments") || "[]"); //getItem으로 갖고 있던 문자열을 JSON.parse로 객체화 시킴 
  comments.push(newComment); //배열에 새로운 리뷰 값 추가
  localStorage.setItem("comments", JSON.stringify(comments)); //문자열만 저장이 가능하기 때문에 JSON.stringify로 문자열화 시킨 후 localStorage에 저장
}

//리뷰작성 글 화면에 뿌리기
function loadComments() {
  reviewDiv.innerHTML = ""; // 페이지로드 시 초기화
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter((comment) => comment.movieId === searchParam("id"));
  commentFilter.forEach((comment, index) => {
    const reviewHtml = `
      <div class="commentBox">
        <div class="profileCircle"></div>
        <div class="profileBox">
          <div class="nickname">${comment.id}</div>
          <img class="heart_image" src="${comment.liked ? "../img/heart_full.png" : "../img/heart.png"}" onclick="toggleLike(${index})" alt="#">
          <p>${comment.comment}</p>
          <div class="timeStamp">${new Date(comment.time).toLocaleString()}</div>
          <div class="profileEdit">
            <div class="textBox">
              <button class="btn_design" onclick="editComment(${index})">수정</button>
              <button class="btn_design" onclick="deleteComment(${index})">삭제</button>
            </div>
          </div>
        </div>
      </div>`;
    reviewDiv.innerHTML += reviewHtml;
  });
}

//페이지 로드 시 마지막 작업 페이지 로드
window.onload = function () {
  loadComments();
};

//관람평작성 버튼 클릭 시 폼 제출과 리뷰 목록 나열
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (comment.value === "") {
    alert("후기를 작성해주세요!");
    comment.focus();
    return;
  } else {
    const newComment = {
      movieId: searchParam("id"),
      id: Id.value,
      password: password.value,
      comment: comment.value,
      time: new Date().toISOString(),
    };
    saveComments(newComment); // 새 리뷰 내용 값 저장
    loadComments(); //리뷰 목록 화면에 불러오기
    reviewForm.reset(); //리뷰폼 초기화
  }
});

//리뷰 삭제 함수
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter((comment) => comment.movieId === searchParam("id"));
  const commentToDelete = commentFilter[index];
  const inputPassword = prompt("비밀번호를 입력하세요.");
  if (inputPassword === null) {
    alert("취소되었습니다.");
    return;
  }
  if (inputPassword === commentToDelete.password) {
    const filteredComments = comments.filter((comment) => comment.time !== commentToDelete.time); //작성된 댓글의 시간과 삭제하려는 댓글의 시간이 다르면 필터로 남겨둬서 다시 localStorage.setItem으로 저장하고 loadComments()로 다시 페이지 로드하기 
    localStorage.setItem("comments", JSON.stringify(filteredComments));
    loadComments();
    alert("댓글이 삭제되었습니다.");
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}

//리뷰 수정 함수
function editComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter((comment) => comment.movieId === searchParam("id"));
  const commentToEdit = commentFilter[index];
  const originalIndex = comments.findIndex((c) => c.time === commentToEdit.time); //작성된 댓글 시간들 중에 만족하는 요소의 첫번째 요소 반환
  const inputPassword = prompt("비밀번호를 입력하세요.");
  if (inputPassword === null) {
    alert("취소되었습니다.");
    return;
  }
  if (inputPassword !== commentToEdit.password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  const newComment = prompt("새로운 댓글 내용을 입력하세요.", commentToEdit.comment);
  if (newComment === null) {
    alert("취소되었습니다.");
    return;
  }
  if (newComment.trim() === "") {
    alert("수정할 내용을 입력해주세요.");
    return;
  }
  comments[originalIndex].comment = newComment.trim();
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
  alert("댓글이 수정되었습니다.");
}

//하트 버튼 함수
function toggleLike(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter((comment) => comment.movieId === searchParam("id"));
  commentFilter[index].liked = !commentFilter[index].liked; //비교연산자 NOT연산자
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}
