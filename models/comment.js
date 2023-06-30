'use strict';
var loggedInUserId = 1; // 예시로 사용할 로그인된 사용자의 ID

// 댓글 목록 데이터
var comments = [
    { id: 1, content: "벌써 이 소식이 나왔네요!", userId: 1, reportCount: 0 },
    { id: 2, content: "이건 충격적이네요...ㅠㅠ", userId: 2, reportCount: 0 }
];

// 댓글 작성 기능
function addComment(content) {
  if (content.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
  }
  
  var newComment = {
      id: generateCommentId(),
      content: content,
      userId: loggedInUserId,
      reportCount: 0
  };
  
  comments.push(newComment);
  renderComments();
}

// 댓글 수정 기능
function editComment(commentId) {
    var commentIndex = comments.findIndex(function(comment) {
        return comment.id === commentId;
    });

    if (commentIndex !== -1) {
        var newContent = prompt('수정할 내용을 입력하세요:', comments[commentIndex].content);
        if (newContent !== null) {
            comments[commentIndex].content = newContent;
            renderComments();
        }
    }
}

// 댓글 삭제 기능
function deleteComment(commentId) {
    var commentIndex = comments.findIndex(function(comment) {
        return comment.id === commentId;
    });

    if (commentIndex !== -1) {
        var confirmDelete = confirm('정말로 이 댓글을 삭제하시겠습니까?');
        if (confirmDelete) {
            comments.splice(commentIndex, 1);
            renderComments();
        }
    }
}

// 댓글 신고 기능
function reportComment(commentId) {
    var commentIndex = comments.findIndex(function(comment) {
        return comment.id === commentId;
    });
  
    if (commentIndex !== -1) {
        var comment = comments[commentIndex];
        comment.reportCount++;
  
        if (comment.reportCount >= 10) {
            comments.splice(commentIndex, 1);
            alert('해당 댓글이 누적된 신고로 인해 삭제되었습니다.');
        } else {
            var reason = prompt('신고 사유를 입력하세요:');
            if (reason !== null && reason.trim() !== '') {
                saveDeclaration(commentId, reason);
            } else {
                alert('신고 사유를 입력해주세요.');
            }
        }
  
        renderComments();
    }
}

// 댓글 목록 표시 함수
function renderComments() {
    var commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';

    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        var commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
    }
}

// 댓글 요소 생성 함수
function createCommentElement(comment) {
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    var contentElement = document.createElement('span');
    contentElement.classList.add('content');
    contentElement.textContent = comment.content;

    var actionsElement = document.createElement('span');
    actionsElement.classList.add('actions');

    var editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.addEventListener('click', function() {
        editComment(comment.id);
    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function() {
        deleteComment(comment.id);
    });

    var reportButton = document.createElement('button');
    reportButton.textContent = '신고';
    reportButton.addEventListener('click', function() {
        reportComment(comment.id);
    });

    actionsElement.appendChild(editButton);
    actionsElement.appendChild(deleteButton);
    actionsElement.appendChild(reportButton);

    commentElement.appendChild(contentElement);
    commentElement.appendChild(actionsElement);

    return commentElement;
}

// 댓글 작성 폼 제출 이벤트 핸들러
var commentForm = document.getElementById('commentForm');
var commentInput = document.getElementById('commentContent');

commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var commentContent = commentInput.value;
    addComment(commentContent);
    commentForm.reset();
});

commentInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        var commentContent = commentInput.value;
        addComment(commentContent);
        commentForm.reset();
    }
});

// 초기 댓글 목록 표시
renderComments();

// 댓글 ID 생성 함수 (임시로 사용)
function generateCommentId() {
    return comments.length + 1;
}

// 댓글 신고 내용 저장 함수
function saveDeclaration(commentId, reason) {
    console.log("댓글 ID:", commentId);
    console.log("신고 사유:", reason);
}
