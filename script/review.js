const reviewForm = document.getElementById("reviewForm");
const reviewDiv = document.getElementById("reviewDiv");

const Id = document.getElementById("username");
const password = document.getElementById("pw");
const comment = document.getElementById("comment");
const reviewBtn = document.getElementById("reviewBtn");

function toggleLike(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments[index].liked = !comments[index].liked; // 좋아요 상태 변경
  localStorage.setItem("comments", JSON.stringify(comments)); // 변경된 댓글 저장
  loadComments(); // 댓글 다시 불러와서 UI 업데이트
}

// 댓글 저장 함수
function saveComments() {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]"); // 저장된 댓글을 배열로 파싱하거나, 없으면 새 배열 할당
  const newComment = {
    id: Id.value,
    password: password.value,
    comment: comment.value,
    time: new Date().toISOString(), // 댓글 작성 시간 추가
  };
  comments.push(newComment); // 새 댓글 객체를 배열에 추가
  localStorage.setItem("comments", JSON.stringify(comments)); // 배열을 문자열로 변환하여 저장
}

// 댓글 불러오기 및 화면에 뿌리기 함수
function loadComments() {
  reviewDiv.innerHTML = ""; // 기존 댓글창 초기화
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.forEach((comment, index) => {
    let liked = comment.liked || false;
    const reviewHtml = `
        <div class="commentBox">
          <div class="profileCircle">${comment.id}</div>
          
          <div class="profileBox">
            <div class="timeStamp">${new Date(
              comment.time
            ).toLocaleString()}</div> <!--댓글 시간 출력-->
            <img class="heart_image" src=${
              liked ? "../img/heart_full.png" : "../img/heart.png"
            } onclick= "toggleLike(${index})" alt="#">
            <p>${comment.comment}</p>
             
            <div class="profileEdit">
             
              <div class="textBox">
              <button onclick="editComment(${index})">수정</button> <!-- 수정 이벤트 -->
              <button onclick="deleteComment(${index})">삭제</button> <!-- 삭제 이벤트 -->
              </div>
            </div>
          </div>
        </div>`;
    reviewDiv.innerHTML += reviewHtml; // 각 댓글을 reviewDiv에 추가
  });
}

// 댓글 작성 이벤트 리스너
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (comment.value === "") {
    alert("후기를 작성해주세요!");
    comment.focus();
    return;
  } else {
    saveComments(); // 댓글 저장
    loadComments(); // 저장한 댓글 불러와서 화면에 뿌리기
    reviewForm.reset(); // 폼 초기화
  }
});

window.onload = function () {
  loadComments(); // 페이지 로드 시 저장된 댓글을 불러와서 화면에 출력
};

//하트버튼 누르면 이미지변경
const image = document.getElementById("image"); //이미지

heartBtn.addEventListener("click", function () {
  image.src = "../img/heart_full.png";
});

// 예시
document.getElementById("like-button").addEventListener("click", function () {
  const likeButton = this;
  const likeCount = document.getElementById("like-count");

  if (likeButton.classList.contains("liked")) {
    likeButton.classList.remove("liked"); // 좋아요 해제
    likeCount.textContent = parseInt(likeCount.textContent) - 1; // 좋아요 수 감소
  } else {
    likeButton.classList.add("liked"); // 좋아요 추가
    likeCount.textContent = parseInt(likeCount.textContent) + 1; // 좋아요 수 증가
  }
});

//  댓글 삭제 구현
function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentToDelete = comments[index];

  const inputPassword = prompt("비밀번호를 입력하세요:");
  if (inputPassword === commentToDelete.password) {
    comments.splice(index, 1); // 해당 인덱스의 댓글 삭제
    localStorage.setItem("comments", JSON.stringify(comments)); // 로컬 스토리지에 저장
    loadComments(); // 업데이트된 댓글을 다시 로드
    alert("댓글이 삭제되었습니다.");
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}

// 수정 기능 구현
function editComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  const commentToEdit = comments[index];

  const inputPassword = prompt("비밀번호를 입력하세요:");
  if (inputPassword === commentToEdit.password) {
    const newComment = prompt(
      "새로운 댓글 내용을 입력하세요:",
      commentToEdit.comment
    );
    if (newComment !== null && newComment.trim() !== "") {
      commentToEdit.comment = newComment.trim(); // 댓글 내용 업데이트
      localStorage.setItem("comments", JSON.stringify(comments)); // 로컬 스토리지에 저장
      loadComments(); // 업데이트된 댓글을 다시 로드
      alert("댓글이 수정되었습니다.");
    } else {
      alert("수정할 내용을 입력해주세요.");
    }
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}
