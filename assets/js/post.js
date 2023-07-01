// 게시글 생성 (제목, 내용, 카테고리, 이미지파일)

// const form = document.getElementById("form");
// form.addEventListener("submit", submitForm);

function upload() {
    const title = document.getElementById("title");
    const content = document.getElementById('content');
    const category = document.getElementsByName("category");
    const files = document.getElementById("files");

    const formData = new FormData();
    formData.append("title", title.value); // 제목
    formData.append("content", content.value); // 내용
    
    // 이미지업로드 for문
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]); // 이미지
    }

    // 카테고리 설정 for문
    const category_check = 0;
    for(let i = 0; i<category.length; i++){
        if(category[i].checked==true){
            alert(category[i].value);
            category_check++;
            formData.append("category", category.value);  // 카테고리
        }
    }
    if(category_check==0){
        alert("카테고리를 선택해주세요");
        return;
    }

    fetch(`http://localhost:3018/api/news`, {
        method: 'POST',
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
    })
        .then((res) => console.log(res))
        .catch((err) => ("서버 오류가 발생했습니다", err));
}


// 게시글 수정 (제목, 내용, 카테고리, 이미지파일)

function correct() {
  const title = document.getElementById("title");
  const content = document.getElementById('content');
  const category = document.getElementsByName("category");
  const files = document.getElementById("files");

  const formData = new FormData();
  formData.append("title", title.value); // 제목
  formData.append("content", content.value); // 내용
 
  // 이미지업로드 for문
  for(let i =0; i < files.files.length; i++) {
          formData.append("files", files.files[i]); // 이미지
  }

  // 카테고리 설정 for문
  const category_check = 0;
  for(let i = 0; i<category.length; i++){
      if(category[i].checked==true){
          alert(category[i].value);
          category_check++;
          formData.append("category", category.value); // 카테고리
  }
  if(category_check==0){
      alert("카테고리를 선택해주세요");
      return;
  }

  fetch(`http://localhost:3018/api/news`, {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
  })
      .then((res) => console.log(res))
      .catch((err) => ("서버 오류가 발생했습니다", err));
    }
}


// 게시글 생성
      
    //   function soccer(event) {
    //  document.getElementById('categoryresult').innerText = event.target.value;
    //  const category = $('input[name=flexRadioDefault]:checked').val();
    //   }