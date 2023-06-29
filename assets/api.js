function getNewsDetail(goodsId, callback) {
    $.ajax({
        type: "GET",
        url: `/api/news/${newsId}`,
        error: function (xhr, status, error) {
            if (status == 401) {
                alert("로그인이 필요합니다.");
            } else {
                alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
            }
        },
        success: function (response) {
            callback(response.news);
        },
    });
}

function getNewsDetailLiked(goodsId, callback) {
    $.ajax({
        type: "GET",
        url: `/api/like/${newsId}`,
        error: function (xhr, status, error) {
            if (status == 401) {
                alert("로그인이 필요합니다.");
            } else {
                alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
            }
        },
        success: function (response) {
            callback(response.likedCount.count, response.userId);
        },
    });
}

