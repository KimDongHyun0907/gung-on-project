
//https://cors-anywhere.herokuapp.com/
const maskimg = document.querySelector(".show-img");
fetch('http://211.215.36.146:8081/api/test/3')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    maskimg.src =  "data:image/;base64,"+data.img;
    });
  
