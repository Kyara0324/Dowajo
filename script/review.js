const reviewForm = document.getElementById("reviewForm");
const reviewDiv = document.getElementById("reviewDiv");

const Id = document.getElementById("username");
const password = document.getElementById("pw");
const comment = document.getElementById("comment");

const URLSearch = new URLSearchParams(location.search);

function searchParam(key) {
  return URLSearch.get(key);
}

function saveComments(newComment) {
  let comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
  reviewDiv.innerHTML = "";
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter(
    (comment) => comment.movieId === searchParam("id")
  );
  commentFilter.forEach((comment, index) => {
    const reviewHtml = `
      <div class="commentBox">
        <div class="profileCircle"></div>
        <div class="profileBox">
          <div class="nickname">${comment.id}</div>
          <img class="heart_image" src="${
            comment.liked ? "../img/heart_full.png" : "../img/heart.png"
          }" onclick="toggleLike(${index})" alt="#">
          <p>${comment.comment}</p>
          <div class="timeStamp">${new Date(
            comment.time
          ).toLocaleString()}</div>
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
    saveComments(newComment);
    loadComments();
    reviewForm.reset();
  }
});

window.onload = function () {
  loadComments();
};

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter(
    (comment) => comment.movieId === searchParam("id")
  );
  const commentToDelete = commentFilter[index];
  const inputPassword = prompt("비밀번호를 입력하세요.");
  if (inputPassword === null) {
    alert("취소되었습니다.");
    return;
  }
  if (inputPassword === commentToDelete.password) {
    const filteredComments = comments.filter(
      (comment) => comment.time !== commentToDelete.time
    );
    localStorage.setItem("comments", JSON.stringify(filteredComments));
    loadComments();
    alert("댓글이 삭제되었습니다.");
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}

function editComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter(
    (comment) => comment.movieId === searchParam("id")
  );
  const commentToEdit = commentFilter[index];
  const originalIndex = comments.findIndex(
    (c) => c.time === commentToEdit.time
  );
  const inputPassword = prompt("비밀번호를 입력하세요.");
  if (inputPassword === null) {
    alert("취소되었습니다.");
    return;
  }
  if (inputPassword !== commentToEdit.password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  const newComment = prompt(
    "새로운 댓글 내용을 입력하세요.",
    commentToEdit.comment
  );
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

function toggleLike(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentFilter = comments.filter(
    (comment) => comment.movieId === searchParam("id")
  );
  commentFilter[index].liked = !commentFilter[index].liked;
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}
