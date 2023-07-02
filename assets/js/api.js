let loginUserNickname = null;
let writeNickname = null;
let loginUserId = null;
let isLiked = null;

function getNews() {
  $.ajax({
    type: 'GET',
    url: '/api/getnews',
    success: function (res) {
      const news = res.news;
      news.map((item) => {
        newsId = item.newsId;
        userId = item.UserId;
        img = item.img;
        if (item.title.length > 30) {
          title = item.title.substring(0, 31) + ' ...';
        } else {
          title = item.title;
        }
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

        $('.news-category').html('축구소식');
        $('.news-box').append(template);
      });
    },
  });
}

// 로그인 버튼
function signIn() {
  let id = $('#id').val();
  let password = $('#password').val();
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: {
      id: id,
      password: password,
    },
    success: function (res) {
      location.reload();
    },
    error: function (error) {
      alert(error.responseJSON.message);
    },
  });
}

// 로그아웃 버튼
function logOut() {
  $.ajax({
    type: 'POST',
    url: '/api/logout',
    success: function () {
      location.reload();
    },
  });
}

// 로그인 체크
function loginCheck() {
  if (document.cookie) {
    $.ajax({
      type: 'GET',
      url: '/api/logincheck',
      success: function (res) {
        const userInfo = res.userInfo;

        const userId = userInfo.userId;
        const id = userInfo.id;

        const template = `<div class="login-user">
                            <p class="login-id">접속중인 id : <a href="/userInfo.html?userId=${userId}">${id}</p>
                          </div>`;

        $('.user-form').html(template);
        $('.logout-btn').removeClass('blind');
        $('#signUpList').hide();
        document.getElementById('writeA').onclick = '';

        loginUserNickname = userInfo.nickname;
        loginUserId = userId;
      },
    });
  }
}

// 국내축구 카테고리
function kFootball() {
  $('.news-box').empty();
  $.ajax({
    type: 'GET',
    url: '/api/getnews',
    success: function (res) {
      const news = res.news;
      const newsList = news.filter((a) => {
        return a['category'] === '국내';
      });
      newsList.filter((item) => {
        newsId = item.newsId;
        userId = item.UserId;
        img = item.img;
        if (item.title.length > 30) {
          title = item.title.substring(0, 31) + ' ...';
        } else {
          title = item.title;
        }
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

        $('.news-category').html(`${item.category}축구`);
        $('.news-box').append(template);
      });
    },
  });
}

// 해외축구 카테고리
function wFootball() {
  $('.news-box').empty();
  $.ajax({
    type: 'GET',
    url: '/api/getnews',
    success: function (res) {
      const news = res.news;
      const newsList = news.filter((a) => {
        return a['category'] === '해외';
      });
      newsList.map((item) => {
        newsId = item.newsId;
        userId = item.UserId;
        img = item.img;
        if (item.title.length > 30) {
          title = item.title.substring(0, 31) + ' ...';
        } else {
          title = item.title;
        }
        createdAt = item.createdAt.substring(0, 10);
        user = item.User.nickname;

        const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

        $('.news-category').html(`${item.category}축구`);
        $('.news-box').append(template);
      });
    },
  });
}

// 최신, 과거순 정렬 함수
function dateSort() {
  $('.news-box').empty();

  // 정렬 버튼 텍스트
  let sortBtnText = $('.date-sort-btn').html();
  // 카테고리 텍스트
  let category = $('.news-category').html();

  // 과거순으로
  if (sortBtnText === '최신순') {
    if (category === '국내축구') {
      $.ajax({
        type: 'GET',
        url: '/api/getoldnews',
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a['category'] === '국내';
          });
          newsList.map((item) => {
            newsId = item.newsId;
            userId = item.UserId;
            img = item.img;
            if (item.title.length > 30) {
              title = item.title.substring(0, 31) + ' ...';
            } else {
              title = item.title;
            }
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

            $('.news-category').html(`${item.category}축구`);
            $('.news-box').append(template);
          });
          $('.date-sort-btn').html('과거순');
        },
      });
    } else if (category === '해외축구') {
      $.ajax({
        type: 'GET',
        url: '/api/getoldnews',
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a['category'] === '해외';
          });
          newsList.map((item) => {
            newsId = item.newsId;
            userId = item.UserId;
            img = item.img;
            if (item.title.length > 30) {
              title = item.title.substring(0, 31) + ' ...';
            } else {
              title = item.title;
            }
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

            $('.news-category').html(`${item.category}축구`);
            $('.news-box').append(template);
          });
          $('.date-sort-btn').html('과거순');
        },
      });
    } else {
      $.ajax({
        type: 'GET',
        url: '/api/getoldnews',
        success: function (res) {
          const news = res.news;
          news.map((item) => {
            newsId = item.newsId;
            userId = item.UserId;
            img = item.img;
            if (item.title.length > 30) {
              title = item.title.substring(0, 31) + ' ...';
            } else {
              title = item.title;
            }
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

            $('.news-category').html(`축구소식`);
            $('.news-box').append(template);
          });
          $('.date-sort-btn').html('과거순');
        },
      });
    }
  }
  // 최신순으로
  else if (sortBtnText === '과거순') {
    if (category === '국내축구') {
      $.ajax({
        type: 'GET',
        url: '/api/getnews',
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a['category'] === '국내';
          });
          newsList.map((item) => {
            newsId = item.newsId;
            userId = item.UserId;
            img = item.img;
            if (item.title.length > 30) {
              title = item.title.substring(0, 31) + ' ...';
            } else {
              title = item.title;
            }
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

            $('.news-category').html(`${item.category}축구`);
            $('.news-box').append(template);
          });
          $('.date-sort-btn').html('최신순');
        },
      });
    } else if (category === '해외축구') {
      $.ajax({
        type: 'GET',
        url: '/api/getnews',
        success: function (res) {
          const news = res.news;
          const newsList = news.filter((a) => {
            return a['category'] === '해외';
          });
          newsList.map((item) => {
            newsId = item.newsId;
            userId = item.UserId;
            img = item.img;
            if (item.title.length > 30) {
              title = item.title.substring(0, 31) + ' ...';
            } else {
              title = item.title;
            }
            createdAt = item.createdAt.substring(0, 10);
            user = item.User.nickname;

            const template = `<ul class="news-item">
                            <li class="news-list">
                              <div class="news-card">
                                <a href="/newsDetail.html?newsId=${newsId}"><img src="${img}" alt="news_image" onerror="this.src='http://placehold.it/300x300'" /></a>
                                <h3><a href="/newsDetail.html?newsId=${newsId}">${title}</a></h3>
                                <p>${createdAt}</p>
                                <p><a href="/userInfo.html?userId=${userId}">${user}</a></p>
                              </div>
                            </li>
                          </ul>`;

            $('.news-category').html(`${item.category}축구`);
            $('.news-box').append(template);
          });
          $('.date-sort-btn').html('최신순');
        },
      });
    } else {
      getNews();
      $('.date-sort-btn').html('최신순');
    }
  }
}

function getNewsDetail(goodsId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/news/${newsId}`,
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
    },
    success: function (response) {
      const [news] = response.news;
      writeNickname = news.nickname;
      callback(response.news);
    },
  });
}

function getNewsDetailLiked(newsId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/like/${newsId}`,
    error: function (xhr, status, error) {
      console.log(error);
      alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
    },
    success: function (response) {
      callback(response.likedCount.count);
    },
  });
}

function getUserlikedcheck(newsId) {
  $.ajax({
    type: 'GET',
    url: `/api/like/${newsId}/${loginUserId}`,
    error: function (xhr, status, error) {
      alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
    },
    success: function (response) {
      if (response.isLiked) isLiked = true;
      else isLiked = false;
    },
  });
}

function clickLikedBtn(newsId) {
  if (!isLiked) {
    $.ajax({
      type: 'POST',
      url: `/api/like/${newsId}`,
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.errorMessage);
      },
      success: function () {
        getNewsDetailLiked(newsId, function (likedCount) {
          $('#liked').text(likedCount);
          getUserlikedcheck(newsId);
        });
      },
    });
  } else {
    $.ajax({
      type: 'DELETE',
      url: `/api/like/${newsId}`,
      error: function (xhr, status, error) {
        alert(xhr.responseJSON.errorMessage);
      },
      success: function () {
        getNewsDetailLiked(newsId, function (likedCount) {
          $('#liked').text(likedCount);
          getUserlikedcheck(newsId);
        });
      },
    });
  }
}

function btnReady() {
  if (loginUserNickname === writeNickname) {
    const template = `
      <button onclick=clickUpdateBtn(newsId)>수정</button>
      <button onclick=clickDeleteBtn(newsId)>삭제</button>
    `;

    $('#updateBtnDiv').append(template);
  }
}

function clickUpdateBtn(newsId) {}

function clickDeleteBtn(newsId) {
  $.ajax({
    type: 'DELETE',
    url: `http://localhost:3018/api/news/${newsId}`,
    success: function (response) {
      if (response['result'] == 'success') {
        alert('글이 정상적으로 삭제되었습니다.');
        location.href = '/';
      }
    },
  });
}

//댓글 작성
function addComment(newsId) {
  if(!loginUserId){
    alert('로그인 댓글을 남길 수 있습니다.');
    return ;
  }

  const content = document.querySelector("#commentContent").value;
  if(content){
    $.ajax({
      type: 'POST',
      url: `/api/news/${newsId}/comments`,
      data: {content:content},
      success: function (res) {
        getComments(newsId);
        document.querySelector("#commentContent").value = "";
      },
      error: function (error) {
        console.log(error);
        alert('댓글 작성에 실패했습니다.');
      },
    });
  }else{
    alert("내용을 입력해주세요");
  }
}

// 댓글 수정 기능
function editComment(newsId, commentId, beforeContent) {
  const content = prompt("수정할 내용을 입력해주세요.",beforeContent);
  if(content){
    $.ajax({
      type: 'PUT',
      url: `/api/news/${newsId}/comments/${commentId}`,
      data: {content:content},
      success: function () {
        getComments(newsId);
        document.querySelector("#commentContent").value = "";
      },
      error: function () {
        alert('댓글 수정에 실패했습니다.');
      }
    });
  }else{
    alert("내용을 입력해주세요");
  }
}

// 댓글 삭제 기능
function deleteComment(newsId, commentId) {
  if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      $.ajax({
        type: 'DELETE',
        url: `/api/news/${newsId}/comments/${commentId}`,
      success: function (res) {
        getComments(newsId);
      },
      error: function () {
        alert('댓글 삭제에 실패했습니다.');
      }
    });
  }
}

// 댓글 신고 기능
function declarateComment(newsId, commentId) {
  if(loginUserId){
    const content = prompt("신고사유를 작성해주세요.");
    if(content){
      $.ajax({
        type: 'POST',
        url: `/api/news/${newsId}/comments/${commentId}/declaration`,
        data: {content:content},
        success: function () {
          alert('댓글을 신고했습니다.');
          declarationProccess(newsId, commentId);
        },
        error: function () {
          alert('댓글 신고에 실패하였습니다.');
        }
      });
    }else{
      alert("내용을 입력해주세요");
    }
  }else{
    alert("로그인 후 이용 가능합니다.");
  }
}

function getComments(newsId){
  $.ajax({
    type: 'GET',
    url: `/api/news/${newsId}/comments`,
    error: function (xhr, status, error) {
      alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
    },
    success: function (response) {
      let commentsContainer = $('#comments');
      commentsContainer.empty();
      const comments = response.comments;
      for(let i = 0; i < comments.length; i++){
        let commentElement = createCommentElement(newsId, comments[i]);
        commentsContainer.append(commentElement);
      }
    }
  });
}

function declarationProccess(newsId, commentId){
  $.ajax({
    type: 'DELETE',
    url: `/api/news/comments/${commentId}/declaration`,
    success: function (response) {
      if(response.check === "OK") getComments(newsId);
    }
  });
}

function createCommentElement(newsId, comment) {
  console.log("dd");
  let commentElement = $('<div>').addClass('comment');
  let contentElement = $('<span>').addClass('commentContent').text(": "+comment.content);
  let actionsElement = $('<span>').addClass('actions');

  // 닉네임을 표시하는 요소 생성
  let nicknameElement = $('<span>').addClass('commentNickname').text(comment.nickname);
  // 클릭 이벤트 핸들러 추가
  nicknameElement.on('click', function() {
    // 네비게이션 코드를 여기에 추가
    window.location.href = '/userinfo.html?userId=' + comment.userId;
  });

  if(loginUserId === comment.userId){
    let editButton = $('<button>').text('수정');
    editButton.on('click', function() {
      editComment(newsId, comment.commentsId, comment.content);
    });

    let deleteButton = $('<button>').text('삭제');
    deleteButton.on('click', function() {
      deleteComment(newsId, comment.commentsId);
    });
  
    actionsElement.append(editButton, deleteButton);
  }

  let declarateButton = $('<button>').text('신고');
  declarateButton.on('click', function() {
    declarateComment(newsId, comment.commentsId);
  });

  actionsElement.append(declarateButton);
  commentElement.append(nicknameElement, contentElement, actionsElement);

  return commentElement;
}