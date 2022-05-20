//Btn1 로그인
//Btn2 회원가입
const navBtn1 = document.querySelector(".main-bar__column:last-child>a:nth-child(2)");
const navBtn2 = document.querySelector(".main-bar__column:last-child>a:last-child");
//유저버튼
//로그아웃버튼
const nav = document.querySelector(".main-bar__column:last-child");


fetch('http://ec2-34-209-136-126.us-west-2.compute.amazonaws.com:5000/token')
  .then((response) => response.json())
  .then((data) => {
    if(data.username != undefined){
        //기존 로그인 화원가입 버튼 지우기
        navBtn1.classList.add("hidden");
        navBtn2.classList.add("hidden");
        //유저 로그아웃 버튼 생성
        const userBtn = document.createElement("a");
        const logoutBtn = document.createElement("a");
        userBtn.innerHTML = data.username; // 토큰에 있는 username 
        logoutBtn.text = "로그아웃";
        nav.appendChild(userBtn); 
        nav.appendChild(logoutBtn);
        userBtn.classList.remove("hidden");
        logoutBtn.classList.remove("hidden");
    }
    else{
        navBtn1.classList.remove("hidden");
        navBtn2.classList.remove("hidden");
        userBtn.classList.add("hidden");
        logoutBtn.classList.add("hidden");
    }
});
