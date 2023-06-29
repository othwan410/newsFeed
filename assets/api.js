function getNewsDetail(newsId, callback) {
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

function getNewsDetailLiked(newsId, callback) {
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
            callback(response.likedCount);
        },
    });
}




// 바이너리 업로드 (img파일)
function Uploader(file) {
    this._file = file;
    this._xhr = new XMLHttpRequest();
    this._xhr.addEventListener("load", transferComplete);        

    // 파일 하나에 대한 업로드를 시작한다.
    this.startUpload = function () {
        var reader = new FileReader();
        var fileName = this._file.name;
        var xhr = this._xhr;

        // FileReader에서 파일 내용을 모두 읽은 경우 AJAX으로 전송한다.
        reader.onload = function(evt) {
            xhr.open("POST", "upload.asp", true);
            // 파일 이름은 file-name에 명시한다.
            xhr.setRequestHeader("file-name", encodeURIComponent(fileName));
            xhr.send(evt.target.result);
        };
        reader.readAsArrayBuffer(file);            
    }

    function transferComplete() {
        // 성공적으로 업로드된 경우 UI에 출력한다.
        if (this.status == 200) {
            var li = document.createElement("li");
            li.innerHTML = this.responseText;
            document.getElementById("resultList").appendChild(li);
        }
    }
}

function fileUpload() {
    var uploadFiles = document.getElementById("uploadFiles");
    var uploader = new Uploader(uploadFiles.files[0]);
    uploader.startUpload();
}