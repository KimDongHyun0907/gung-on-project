var error = document.querySelectorAll('.error_next_box');

var id=document.querySelector('#id');
id.addEventListener("focusout", checkId);

function checkId() {
    var idPattern=/^[a-z0-9_-]{5,20}$/;
    if(id.value == "") {
        error[0].innerHTML = "필수 정보입니다.";
        error[0].style.color='red';
        error[0].style.display = "block";
    }
    else if(!idPattern.test(id.value)) {
        error[0].innerHTML = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
        error[0].style.display = "block";
        error[0].style.color='red';
    }
    else {
        error[0].innerHTML = "사용 가능한 아이디입니다!";
        error[0].style.color = "green";
        error[0].style.display = "block";
    }
}

var pw=document.querySelector('#pw');
var pwmsg = document.querySelector('#alerttxt');
var pwmsgarea = document.querySelector('.int_pw');
var pw_img1=document.querySelector('#pw_img1');
pw.addEventListener("focusout", checkPw);

function checkPw() {
    //var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    var pwPattern=/^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}$/;
    if(pw.value == "") {
        error[1].innerHTML = "필수 정보입니다.";
        error[1].style.display = "block";
        pwmsg.innerHTML="";
        pw_img1.src = "/frontend/img/m_icon_pass.png";
    } else if(!pwPattern.test(pw.value)) {
        error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwmsg.innerHTML = "사용불가";
        pwmsg.style.color = "red";
        error[1].style.display = "block";
        
        pwmsg.style.display = "block";
        pw_img1.src = "/frontend/img/m_icon_not_use.png";
    } else {
        error[1].style.display = "none";
        pwmsg.innerHTML = "안전";
        pwmsg.style.display = "block";
        pwmsg.style.color = "green";
        pw_img1.src = "/frontend/img/m_icon_safe.png";
    }
}

var pw2=document.querySelector('#pw2');
var pw_img2=document.querySelector('#pw_img2');
pw2.addEventListener("focusout", comparePw);

function comparePw() {
    if(pw2.value === pw.value && pw2.value != "") {
        pw_img2.src = "/frontend/img/m_icon_check_enable.png";
        error[2].innerHTML="비밀번호가 일치합니다."
        error[2].style.color='green';
        error[2].style.display = "block";
    } else if(pw2.value !== pw.value) {
        pw_img2.src = "/frontend/img/m_icon_check_disable.png";
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.color='red';
        error[2].style.display = "block";
    } 

    if(pw2.value == "") {
        error[2].innerHTML = "필수 정보입니다.";
        error[2].style.display = "block";
    }
}

var username = document.querySelector('#name');
username.addEventListener("focusout", checkName);

function checkName() {
    var namePattern = /[a-zA-Z가-힣]/;
    if(username.value == "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
    } else if(!namePattern.test(username.value) || username.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error[3].style.display = "block";
    } else {
        error[3].style.display = "none";
    }
}

var year = document.querySelector('#year');
var month = document.querySelector('#month');
var day = document.querySelector('#day');
year.addEventListener("focusout", isBirthCompleted);
month.addEventListener("focusout", isBirthCompleted);
day.addEventListener("focusout", isBirthCompleted);

function isBirthCompleted() {
    var yearPattern = /[0-9]{4}/;
    var dayPattern=/[0-9]{1,2}/;
    var month_30=[4,6,9,11];

    if(!yearPattern.test(year.value)) {
        error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
        error[4].style.display = "block";
    } 
    else if(month.value=="월"){
        error[4].innerHTML = "태어난 월을 선택하세요.";
        error[4].style.display = "block";
    }
    else if(!dayPattern.test(day.value)){
        error[4].innerHTML = "태어난 일(날짜)를 정확하게 입력하세요.";
        error[4].style.display = "block";
    }

    else if(Number(day.value)<1 || Number(day.value)>31){
        error[4].innerHTML="생년월일을 다시 확인해주세요.";
        error[4].style.display = "block";
    }

    else{
        error[4].style.display="none";
    }

    for (var i=0;i<month_30.length;i++){
        if(month_30[i]==month.value){
            if(day.value>=31){
                error[4].innerHTML="생년월일을 다시 확인해주세요.";
                error[4].style.display = "block";
            }
        }
    }
    if(month.value==2){
        if((year.value%4==0 && year.value%100!=0) || year.value%400==0){
            if(day.value<=29){
                error[4].style.display = "none";
            }
            else{
                error[4].innerHTML="생년월일을 다시 확인해주세요.";
                error[4].style.display="block";
            }
        }
        else{
            if(day.value<=28){
                error[4].style.display = "none";
            }
            else{
                error[4].innerHTML="생년월일을 다시 확인해주세요.";
                error[4].style.display="block";
            }
        }
        if(day.value>=30){
            error[4].innerHTML="생년월일을 다시 확인해주세요.";
            error[4].style.display = "block";
        }
    }
}

var gender = document.querySelector('#gender');
gender.addEventListener("focusout",isGenderCorrect)
function isGenderCorrect() {
    if(gender.value == "성별") {
        error[5].style.display = "block";
    } else {
        error[5].style.display = "none";
    }
}


var email = document.querySelector('#email');
email.addEventListener("focusout", isEmailCorrect);

function isEmailCorrect() {
    var emailPattern=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(email.value == ""){ 
        error[6].innerHTML="필수 정보입니다.";
        error[6].style.display = "block"; 
    } else if(!emailPattern.test(email.value)) {
        error[6].style.display = "block";
        error[6].innerHTML="이메일 주소를 다시 확인해주세요.";
    } else {
        error[6].style.display = "none"; 
    }
}

var phone = document.querySelector('#phone');
phone.addEventListener("focusout", checkPhoneNum);

function checkPhoneNum() {
    var isPhoneNum = /([010]{3})([0-9]{4})([0-9]{4})/;

    if(phone.value == "") {
        error[7].innerHTML = "필수 정보입니다.";
        error[7].style.display = "block";
    } else if(!isPhoneNum.test(phone.value)) {
        error[7].innerHTML = "형식에 맞지 않는 번호입니다.";
        error[7].style.display = "block";
    } else {
        error[7].style.display = "none";
    }
}

function regSubmit(){
    var id=document.getElementById('id').value;
    var pw=document.getElementById('pw').value;
    var pw2=document.getElementById('pw2').value;
    var name=document.getElementById('name').value;
    var year=document.getElementById('year').value;
    var day=document.getElementById('day').value;
    var email=document.getElementById('email').value;
    var phone=document.getElementById('phone').value;

    if(id=="" || pw=="" || pw2=="" || name=="" || year=="" || day=="" || email=="" || phone==""){
        alert("정보를 다시 확인해주세요.");
        return false;
    }
    else{
        alert("가입이 완료되었습니다.");
    }

    var i;
    for(i=0;i<8;i++){
        if(error[i].style.color=="red"){
            alert("정보를 다시 확인해주세요.");
            return false;
        }
    }
}