
fetch('data.json')
.then((response) => response.json())
.then((data) => {

    console.log(data);

    
    for(i = 0; i < data.length; i++)
    {
        let mainDiv = document.createElement("div");
        mainDiv.appendChild(createPost(data[i].title));
        mainDiv.setAttribute("class","blogItem")
        for (j = 0; j < data[i].content.length; j++)
        {
            if (data[i].content[j].type === "txt")
            {
                mainDiv.appendChild(createParagraf(data[i].content[j].title, data[i].content[j].text));
            }
            else if (data[i].content[j].type === "img")
            {
                mainDiv.appendChild(createImage(data[i].content[j].path, data[i].content[j].imgText));
            }
            console.log("loop"); 
        }
        mainDiv.appendChild(endPost(data[i].author, data[i].location));
        console.log("loop2");
        document.getElementById("blogContainer").appendChild(mainDiv);
    }      
    console.dir(mainDiv);
})

function createPost(postTitle) {
    let div = document.createElement("div");

    let title = document.createElement("h2")
    title.append(postTitle);

    div.appendChild(title);

    return div;
}

function createParagraf(titleText, text) {
    
    let div = document.createElement("div");

    let title = document.createElement("h3");
    title.append(titleText);

    let paragraf = document.createElement("p");
    paragraf.append(text);

    div.appendChild(title);
    div.appendChild(paragraf);

    return div;
}

function createImage(image, imageText) {

    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = image;

    let paragraf = document.createElement("p");
    paragraf.append(imageText);

    div.appendChild(img);
    div.appendChild(paragraf);

    return div;
}

function endPost(postAuthor, postLocation) {

    let div = document.createElement("div");

    let author = document.createElement("p");
    author.append(postAuthor);

    let location = document.createElement("p");
    location.append(postLocation);

    div.appendChild(author);
    div.appendChild(location);

    return div;
}