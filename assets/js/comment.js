var loggedInUserId = 1; // 예시로 사용할 로그인된 사용자의 ID

// 댓글 작성 기능
function addComment(content) {
  if (content.trim() === '') {
    alert('댓글 내용을 입력해주세요.');
    return;
  }

  var newComment = {
    content: content,
    userId: loggedInUserId,
    nickname: '작성자 닉네임' // 작성자 닉네임 설정
  };

  $.ajax({
    type: 'POST',
    url: '/comments',
    data: newComment,
    success: function (response) {
      renderComments();
    },
    error: function () {
      alert('댓글 작성에 실패했습니다.');
    }
  });
}

// 댓글 수정 기능
function editComment(commentId, newContent) {
  $.ajax({
    type: 'PUT',
    url: '/comments/' + commentId,
    data: { content: newContent },
    success: function (response) {
      renderComments();
    },
    error: function () {
      alert('댓글 수정에 실패했습니다.');
    }
  });
}

// 댓글 삭제 기능
function deleteComment(commentId) {
  var confirmDelete = confirm('정말로 이 댓글을 삭제하시겠습니까?');
  if (confirmDelete) {
    $.ajax({
      type: 'DELETE',
      url: '/comments/' + commentId,
      success: function (response) {
        renderComments();
      },
      error: function () {
        alert('댓글 삭제에 실패했습니다.');
      }
    });
  }
}

// 댓글 신고 기능
function reportComment(commentId, reason) {
  $.ajax({
    type: 'POST',
    url: '/comments/' + commentId + '/report',
    data: { reason: reason },
    success: function (response) {
      if (response.deleteComment) {
        alert('해당 댓글이 누적된 신고로 인해 삭제되었습니다.');
      } else {
        alert('댓글을 성공적으로 신고했습니다.');
      }
      renderComments();
    },
    error: function () {
      alert('댓글 신고에 실패했습니다.');
    }
  });
}

// 댓글 목록 표시 함수
function renderComments() {
  $.ajax({
    type: 'GET',
    url: '/comments',
    success: function (response) {
      var commentsContainer = $('#comments');
      commentsContainer.empty();

      for (var i = 0; i < response.length; i++) {
        var comment = response[i];
        var commentElement = createCommentElement(comment);
        commentsContainer.append(commentElement);
      }
    },
    error: function () {
      alert('댓글 목록을 가져오는데 실패했습니다.');
    }
  });
}

// 댓글 요소 생성 함수
function createCommentElement(comment) {
  var commentElement = $('<div>').addClass('comment');
  var contentElement = $('<span>').addClass('content').text(comment.content);
  var actionsElement = $('<span>').addClass('actions');

  // 닉네임을 표시하는 요소 생성
  var nicknameElement = $('<span>').addClass('nickname').text(comment.nickname);
  // 클릭 이벤트 핸들러 추가
  nicknameElement.on('click', function() {
    // 네비게이션 코드를 여기에 추가
    window.location.href = 'http//localhost:3018/userinfo.html?userid=';
  });

  var editButton = $('<button>').text('수정');
  editButton.on('click', function() {
    var newContent = prompt('수정할 내용을 입력하세요:', comment.content);
    if (newContent !== null) {
      editComment(comment.id, newContent);
    }
  });

  var deleteButton = $('<button>').text('삭제');
  deleteButton.on('click', function() {
    deleteComment(comment.id);
  });

  var reportButton = $('<button>').text('신고');
  reportButton.on('click', function() {
    var reason = prompt('신고 사유를 입력하세요:');
    if (reason !== null && reason.trim() !== '') {
      reportComment(comment.id, reason);
    } else {
      alert('신고 사유를 입력해주세요.');
    }
  });

  actionsElement.append(editButton, deleteButton, reportButton);
  commentElement.append(nicknameElement, contentElement, actionsElement);

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
  return Math.floor(Math.random() * 1000) + 1;
}
