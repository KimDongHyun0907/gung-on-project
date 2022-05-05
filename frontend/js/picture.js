const radio = document.getElementsByTagName('input');
const imgTag = document.querySelector('.file-home');
const img = imgTag.getElementsByTagName("img");

const next = document.querySelector(".nextpage");
next.addEventListener("click",choseImg);


function choseImg(event){

    for(let i=0; i<radio.length;i++){
        if(radio[i].checked){
            const imgBack = document.querySelector(".file-background");
            imgBack.appendChild(img[i]);
        }
    }
    document.querySelector(".file-home").classList.add("hidden");
    document.querySelector(".form").classList.remove("hidden");
}
