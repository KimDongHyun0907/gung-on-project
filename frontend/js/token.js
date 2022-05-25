const maskimg = document.querySelector(".show-img");
fetch('/token')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    maskimg.src =  "data:image/;base64,"+data.img;
  });
  
