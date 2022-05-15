const maskimg = document.querySelector(".show-img");
console.log("asdsa");
fetch('http://localhost:5000/upload')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    maskimg.src =  "data:image/;base64,"+data.img;
  });
  
