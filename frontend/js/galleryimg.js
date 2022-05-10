const input = document.querySelector("#gallery-file");
const view = document.querySelector("#gallery-img");
function uploadimg(event){
    const reader = new FileReader();
    console.log(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = event =>{
        view.src=event.target.result;
    };
    view.classList.remove("hidden");
    input.classList.add("hidden");
};
input.addEventListener("change",uploadimg);