const maskimg = document.querySelector(".show-img");
console.log("asdsa");
fetch('http://ec2-34-209-136-126.us-west-2.compute.amazonaws.com:5000/upload')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    maskimg.src =  "data:image/;base64,"+data.img;
  });
  
