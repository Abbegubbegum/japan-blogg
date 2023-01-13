
fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => {

        console.log(data);


        for (i = 0; i < data.length; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.appendChild(createTitle(data[i]))
            mainDiv.setAttribute("class", "blogItem")
            for (j = 0; j < data[i].content.length; j++) {
                if (data[i].content[j].type === "txt") {
                    mainDiv.appendChild(createParagraf(data[i].content[j].title, data[i].content[j].text));
                }
                else if (data[i].content[j].type === "img") {
                    mainDiv.appendChild(createImage(data[i].content[j].path, data[i].content[j].imgText));
                }
                console.log("loop");
            }
            console.log("loop2");
            document.getElementById("blogContainer").appendChild(mainDiv);
        }

        console.dir(mainDiv);
    })

function createTitle(post) {
    let div = document.createElement("div");

    div.classList.add("blog-title");

    let title = document.createElement("h2")
    title.append(post.title);

    let date = document.createElement("p");
    date.append(postDate);

    div.appendChild(title);
    div.appendChild(date);

    div.appendChild(createSubheading(post.date, post.author, post.location));

    return div;
}

function createSubheading(postDate, postAuthor, postLocation) {
    let div = document.createElement("div");

    div.classList.add("blog-subheading");

    let authorLocationDiv = document.createElement("div");

    let author = document.createElement("p");
    author.append("By: " + postAuthor);
    author.classList.add("blog-author")

    let locationDiv = document.createElement("div");
    locationDiv.classList.add("location-div")

    let mapPin = document.createElement("img");
    mapPin.src = "./icons/pin.png";
    mapPin.setAttribute("width", "20");

    locationDiv.appendChild(mapPin)

    let location = document.createElement("p")
    location.append(postLocation)
    location.classList.add("blog-location")

    locationDiv.appendChild(location);

    authorLocationDiv.appendChild(author);
    authorLocationDiv.appendChild(locationDiv);

    let date = document.createElement("p");
    date.append(postDate);
    date.classList.add("blog-date");

    div.appendChild(authorLocationDiv);
    div.appendChild(date);

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

function createImage(imagePath, imageText) {

    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = "./imgs/" + imagePath;
    img.classList.add("blog-img")

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