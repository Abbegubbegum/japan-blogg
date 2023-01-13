// fetch("/api/images")
fetch("./js/mock.json")
.then((res) => res.json())
.then((data) => {

    console.dir(data);
 for (let i = data.length -1; i >= 0; i--) {
     document.getElementById('imgs-container').appendChild(createImage(data[i].path));
 }

  
  
})

function createImage(image) {

    let div = document.createElement("div");
    div.setAttribute("class","img-container");

    let img = document.createElement("img");
    img.src = image;

    div.appendChild(img);

    return div;
}