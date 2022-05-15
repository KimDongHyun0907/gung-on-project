const radio = document.getElementsByName('input1');
const imgTag = document.querySelector('.file-home');
const img = imgTag.getElementsByTagName("img");
const imgBack = document.querySelector(".file-background");
const input1 = document.createElement("input");
input1.setAttribute("type","text");
input1.setAttribute("name","back");
const input2 = document.createElement("input");
input2.setAttribute("type","text");
input2.setAttribute("name","size");
const input3 = document.createElement("input");
input3.setAttribute("type","text");
input3.setAttribute("name","position");
const input4 = document.createElement("input");
input4.setAttribute("type","text");
input4.setAttribute("name","offsetX");

const next = document.querySelector(".nextpage");
next.addEventListener("click",choseedit);

const next1 = document.querySelector(".nextpage1");
next1.addEventListener("click",choseImg);

const size = document.getElementById("editvalue1");
const position = document.getElementById("editvalue2");
const offsetX = document.getElementById("editvalue3");

function choseedit(event){  
    event.preventDefault();
    document.querySelector(".file-home").classList.add("hidden");
    document.querySelector(".changeimg").classList.remove("hidden");
    document.querySelector(".container-file").style.height = "230vh";
}

function choseImg(event){
    event.preventDefault();
    for(let i=0; i<radio.length;i++){   
        if(radio[i].checked){
            imgBack.appendChild(img[i]);
            input1.setAttribute("value",i);
            imgBack.appendChild(input1);
            input2.setAttribute("value",size.value);
            input3.setAttribute("value",position.value);
            input4.setAttribute("value",offsetX.value);
            imgBack.appendChild(input2);
            imgBack.appendChild(input3);
            imgBack.appendChild(input4);
        }
    }
    document.querySelector(".file-home").classList.add("hidden");
    document.querySelector(".changeimg").classList.add("hidden");
    document.querySelector(".form").classList.remove("hidden");
    document.querySelector(".container-file").style.height = "140vh";
    document.querySelector(".file-home").style.height = "calc(150vh - 50vh)";
}
