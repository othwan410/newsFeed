function getGoodsDetail(newsId, callback) {
  $.ajax({
    type: "GET",
    url: `/news/${newsId}`,
    error: function (xhr, status, error) {
      console.log(error);
    },
    success: function (response) {
      callback(response.goods);
    },
  });
}