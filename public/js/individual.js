let timestamp = localStorage.getItem("timestamp");

if (isNaN(timestamp)) {
	localStorage.clear();
	window.location.pathname = "/";
}

fetch("/api/blogs?timestamp=" + timestamp)
	.then((res) => res.json())
	.then((data) => {
		let mainDiv = document.createElement("div");
		mainDiv.setAttribute("class", "blogItem");

		mainDiv.appendChild(createTitle(data));

		let contentDiv = document.createElement("div");
		contentDiv.classList.add("blog-content");
		for (j = 0; j < data.content.length; j++) {
			if (data.content[j].type === "txt") {
				contentDiv.appendChild(
					createParagraf(data.content[j].title, data.content[j].text)
				);
			} else if (data.content[j].type === "img") {
				contentDiv.appendChild(
					createImage(data.content[j].path, data.content[j].text)
				);
			}
		}
		mainDiv.appendChild(contentDiv);
		document.getElementById("blogContainer").appendChild(mainDiv);
	});

function createTitle(post) {
	let div = document.createElement("div");

	div.classList.add("blog-title");

	let date = document.createElement("p");
	date.append(post.date);
	date.classList.add("blog-date");

	let title = document.createElement("h2");
	title.append(post.title);

	div.appendChild(date);
	div.appendChild(title);

	div.appendChild(createSubheading(post.author, post.location));

	return div;
}

function createSubheading(postAuthor, postLocation) {
	let div = document.createElement("div");

	div.classList.add("blog-subheading");

	let author = document.createElement("p");
	author.append("By: " + postAuthor);
	author.classList.add("blog-author");

	let locationDiv = document.createElement("div");
	locationDiv.classList.add("location-div");

	let mapPin = document.createElement("img");
	mapPin.src = "./icons/pin.png";
	mapPin.setAttribute("width", "20");

	locationDiv.appendChild(mapPin);

	let location = document.createElement("p");
	location.append(postLocation);
	location.classList.add("blog-location");

	locationDiv.appendChild(location);

	div.appendChild(author);
	div.appendChild(locationDiv);

	return div;
}

function createParagraf(titleText, text) {
	let div = document.createElement("div");

	let title = document.createElement("h3");
	title.append(titleText);
	title.classList.add("paragraf-title");

	let paragraf = document.createElement("p");
	paragraf.append(text);
	paragraf.classList.add("paragraf-text");

	div.appendChild(title);
	div.appendChild(paragraf);

	return div;
}

function createImage(imagePath, imageText) {
	let div = document.createElement("div");

	let img = document.createElement("img");
	img.src = "https://japanblog-imgs.s3.eu-central-1.amazonaws.com/" + imagePath;
	img.classList.add("blog-img");

	let paragraf = document.createElement("p");
	paragraf.append(imageText);
	paragraf.classList.add("img-text");

	div.appendChild(img);
	div.appendChild(paragraf);

	return div;
}

function redirectToHome() {
	localStorage.clear();
	window.location.pathname = "/";
}
