// 댓글 데이터 배열
var comments = [];

// 댓글 작성 함수
function addComment() {
  var commentText = document.getElementById("commentText").value;
  if (commentText.trim() === "") {
    alert("댓글을 입력하세요.");
    return;
  }

  var comment = {
    id: generateId(),
    text: commentText
  };

  comments.push(comment);
  displayComments();
  clearCommentText();
}

// 댓글 삭제 모달 열기 함수
function openModal(commentId) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  modal.dataset.commentId = commentId;
}

// 댓글 삭제 함수
function deleteComment() {
  var commentId = document.getElementById("myModal").dataset.commentId;
  var index = findCommentIndex(commentId);
  if (index !== -1) {
    comments.splice(index, 1);
    displayComments();
  }
  closeModal();
}

// 모달 닫기 함수
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  modal.dataset.commentId = "";
}

// 댓글 표시 함수
function displayComments() {
  var commentsContainer = document.getElementById("comments");
  commentsContainer.innerHTML = "";

  comments.forEach(function(comment) {
    var commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = comment.text;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "삭제";
    deleteButton.onclick = function() {
      openModal(comment.id);
    };
    commentDiv.appendChild(deleteButton);

    commentsContainer.appendChild(commentDiv);
  });
}

// 댓글 ID 생성 함수
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// 댓글 ID로 인덱스 찾기 함수
function findCommentIndex(commentId) {
  for (var i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      return i;
    }
  }
  return -1;
}

// 댓글 입력창 초기화 함수
function clearCommentText() {
  document.getElementById("commentText").value = "";
}

// 초기 댓글 표시
displayComments();
