var loggedInUserId = 1; // 예시로 사용할 로그인된 사용자의 ID

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

  $.ajax({
    type: 'POST',
    url: '/comments',
    data: newComment,
    success: function () {
      comments.push(newComment);
      renderComments();
    },
    error: function () {
      alert('댓글 작성에 실패했습니다.');
    }
  });
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

      $.ajax({
        type: 'PUT',
        url: '/comments/' + commentId,
        data: comments[commentIndex],
        success: function () {
          renderComments();
        },
        error: function () {
          alert('댓글 수정에 실패했습니다.');
        }
      });
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
      $.ajax({
        type: 'DELETE',
        url: '/comments/' + commentId,
        success: function () {
          comments.splice(commentIndex, 1);
          renderComments();
        },
        error: function () {
          alert('댓글 삭제에 실패했습니다.');
        }
      });
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
      $.ajax({
        type: 'DELETE',
        url: '/comments/' + commentId,
        success: function () {
          comments.splice(commentIndex, 1);
          alert('해당 댓글이 누적된 신고로 인해 삭제되었습니다.');
          renderComments();
        },
        error: function () {
          alert('댓글 삭제에 실패했습니다.');
        }
      });
    } else {
      var reason = prompt('신고 사유를 입력하세요:');
      if (reason !== null && reason.trim() !== '') {
        saveDeclaration(commentId, reason);
      } else {
        alert('신고 사유를 입력해주세요.');
      }
      renderComments();
    }
  }
}

// 댓글 목록 표시 함수
function renderComments() {
  var commentsContainer = $('#comments');
  commentsContainer.empty();

  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    var commentElement = createCommentElement(comment);
    commentsContainer.append(commentElement);
  }
}

// 댓글 요소 생성 함수
function createCommentElement(comment) {
  var commentElement = $('<div>').addClass('comment');
  var contentElement = $('<span>').addClass('content').text(comment.content);
  var actionsElement = $('<span>').addClass('actions');

  var editButton = $('<button>').text('수정');
  editButton.on('click', function() {
    editComment(comment.id);
  });

  var deleteButton = $('<button>').text('삭제');
  deleteButton.on('click', function() {
    deleteComment(comment.id);
  });

  var reportButton = $('<button>').text('신고');
  reportButton.on('click', function() {
    reportComment(comment.id);
  });

  actionsElement.append(editButton, deleteButton, reportButton);
  commentElement.append(contentElement, actionsElement);

  return commentElement;
}

// 댓글 작성 폼 제출 이벤트 핸들러
var commentForm = $('#commentForm');
var commentInput = $('#commentContent');

commentForm.on('submit', function(e) {
  e.preventDefault();
  var commentContent = commentInput.val();
  addComment(commentContent);
  commentForm[0].reset();
});

commentInput.on('keydown', function(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    var commentContent = commentInput.val();
    addComment(commentContent);
    commentForm[0].reset();
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
    $.ajax({
      type: 'POST',
      url: '/comments/' + commentId + '/declaration',
      data: { reason: reason },
      success: function(response) {
        console.log('댓글 신고가 성공적으로 저장되었습니다.');
      },
      error: function() {
        console.error('댓글 신고 저장에 실패했습니다.');
      }
    });
  }
  