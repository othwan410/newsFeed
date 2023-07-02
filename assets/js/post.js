// 게시글 생성 (제목, 내용, 카테고리, 이미지파일)
// const form = document.getElementById("form");
// form.addEventListener("submit", submitForm);

// JQuery (게시글 생성)
async function upload() {  
    const title = $('#title').val();
    const content = $('#content').val();
    const category = $('input[name=radio]:checked').val(); 
    // const foreign = document.getElementsById("foreign");
    // const domestic = document.getElementsById("domestic");
    // console.log(foreign)
    // console.log(domestic)

    const response = await fetch(`http://localhost:3018/api/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, content, category}), // 셋다 업로드 됨
        });
        
        const result = await response.json();
        console.log(result.message);
        return alert(result.message);


}
    // const files = document.getElementById("files");

    // const formData = new FormData();
    // formData.append("title", title.value); // 제목
    // formData.append("content", content.value); // 내용
    
    // 이미지업로드 for문
    // for(let i =0; i < files.files.length; i++) {
    //         formData.append("files", files.files[i]); // 이미지
    // }

    // 카테고리 설정 for문
    // const category_check = 0;
    // for(let i = 0; i<category.length; i++){
    //     if(category[i].checked==true){
    //         alert(category[i].value);
    //         category_check++;
    //         formData.append("category", category.value);  // 카테고리
    //     }
    // }
    // if(category_check==0){
    //     alert("카테고리를 선택해주세요");
    //     return;
    // }

    // let category 

    // if (foreign.checked == true) {
    //     category = foreign.value
    //   }
    //   else if (domestic.checked == true) {
    //     category = domestic.value
    
    //   }

    //   console.log(category)



// 게시글 수정

function correct() {
    const title = $('#title').val();
    const content = $('#content').val();
    const category = $('input[name=radio]:checked').val(); 

    async function upload() {  
        const title = $('#title').val();
        const content = $('#content').val();
        const category = $('input[name=radio]:checked').val(); 
        // const foreign = document.getElementsById("foreign");
        // const domestic = document.getElementsById("domestic");
        // console.log(foreign)
        // console.log(domestic)
    
        const response = await fetch(`http://localhost:3018/api/news/${newsId}`, {
            method: 'PUT', //POST인지 모르겠음
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({title, content, category}), // 셋다 업로드 됨
            });
            
            const result = await response.json();
            console.log(result.message);
            return alert(result.message);
    
    
    }
}


// 게시글 생성
      
    //   function soccer(event) {
    //  document.getElementById('categoryresult').innerText = event.target.value;
    //   }