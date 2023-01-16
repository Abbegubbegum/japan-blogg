fetch("/api/img")
	.then((res) => {
		if (res.status !== 200) {
			throw new Error("bad");
		}
		return res.json();
	})
	.then((data) => {
		for (let i = data.length - 1; i >= 0; i--) {
			if (typeof data[i] === "object") {
				document
					.getElementById("imgs-container")
					.appendChild(createImage("./imgs/" + data[i].path));
			}
		}

		for (let i = data.length - 1; i >= 0; i--) {
			if (typeof data[i] === "string") {
				document
					.getElementById("imgs-container")
					.appendChild(createImage("./imgs/" + data[i]));
			}
		}
	})
	.catch((err) => {
		console.log(err);
		alert("Images failed to load. Please try again later!");
		window.location.pathname = "/";
	});

function createImage(image) {
	let div = document.createElement("div");
	div.setAttribute("class", "img-container");

	let img = document.createElement("img");
	img.setAttribute("class", "indImg");
	img.src = image;

	div.appendChild(img);

	return div;
}
