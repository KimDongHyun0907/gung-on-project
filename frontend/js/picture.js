const radio = document.getElementsByTagName('input');
const imgTag = document.querySelector('.file-home');
const img = imgTag.getElementsByTagName("img");
const imgBack = document.querySelector(".file-background");
const input = document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("name","back");

const next = document.querySelector(".nextpage");
next.addEventListener("click",choseImg);

function choseImg(event){
    event.preventDefault();
    for(let i=0; i<radio.length;i++){
        if(radio[i].checked){
            imgBack.appendChild(img[i]);
            input.setAttribute("value",i);
            imgBack.appendChild(input);
        }
    }
    document.querySelector(".file-home").classList.add("hidden");
    document.querySelector(".form").classList.remove("hidden");
    document.querySelector(".container-file").style.height = "140vh";
    document.querySelector(".file-home").style.height = "calc(150vh - 50vh)";
}
