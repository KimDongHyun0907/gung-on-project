function createBox(imgURL,user,title){
    const gBox = document.querySelector(".main-content__info");
    const gDiv = document.createElement("div");
    gDiv.className = "gallery-box";

    const gImg = document.createElement("img");
    gImg.src=`${imgURL}`;

    gDiv.appendChild(gImg);

    const gChiledDiv = document.createElement("div");
    gChiledDiv.className = "gallery-item";

    const gDiv1 = document.createElement("div");
    const gDiv2 = document.createElement("div");
    gDiv1.className = "gallery-item__name";
    gDiv1.innerText = `${user}`;
    gDiv2.className = "gallery-item__title";
    gDiv2.innerText = `${title}`;

    gChiledDiv.appendChild(gDiv1);
    gChiledDiv.appendChild(gDiv2);

    gDiv.appendChild(gChiledDiv);
    gBox.appendChild(gDiv);
}

fetch('http://ec2-34-209-136-126.us-west-2.compute.amazonaws.com:5000/call_db')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.length);
    for(let i=0;i<data.length;i++){
        createBox(data[i].url,data[i].user,data[i].title)
    }
});

