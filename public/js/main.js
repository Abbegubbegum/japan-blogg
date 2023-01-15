fetch("/api/blogs")
	.then((response) => response.json())
	.then((data) => {
		data.sort((a, b) => b.timestamp - a.timestamp);

		for (i = 0; i < data.length; i++) {
			let mainDiv = document.createElement("div");
			mainDiv.setAttribute("class", "blogItem");

			mainDiv.appendChild(createTitle(data[i]));

			mainDiv.setAttribute(
				"onclick",
				`redirectToIndividual(${data[i].timestamp})`
			);

			document.getElementById("blogContainer").appendChild(mainDiv);
		}
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

function redirectToIndividual(timestamp) {
	localStorage.setItem("timestamp", timestamp);
	window.location.pathname = "/individual.html";
}
