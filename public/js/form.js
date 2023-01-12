const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendForm();
});

function addParagraf() {
  let div = document.createElement("div");
  div.setAttribute("class", "paragraf-container");

  let nodeTitle = document.createElement("label");
  nodeTitle.setAttribute("for", "paragraf-title");

  let titleText = document.createElement("h3");
  titleText.append("Paragraf title:");

  let titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("class", "paragraf-title");

  nodeTitle.appendChild(titleText);
  nodeTitle.appendChild(titleInput);
  div.appendChild(nodeTitle);

  let nodeParagraf = document.createElement("label");
  nodeParagraf.setAttribute("for", "paragraf-text");

  let text = document.createElement("h3");
  text.append("Paragraf:");
  let input = document.createElement("textarea");
  input.setAttribute("for", "paragraf-text");
  input.setAttribute("cols", "30");
  input.setAttribute("rows", "10");

  nodeParagraf.appendChild(text);
  nodeParagraf.appendChild(input);

  div.appendChild(nodeParagraf);

  let rmButton = document.createElement("button");
  rmButton.setAttribute("type", "button");
  rmButton.setAttribute("onclick", "removeElement(event)");
  rmButton.append("Remove Element");

  div.appendChild(rmButton);

  document.getElementById("blog-content-container").appendChild(div);
}
function addIMG() {
  let div = document.createElement("div");
  div.setAttribute("class", "img-container");

  let nodeSrc = document.createElement("label");
  nodeSrc.setAttribute("for", "img-src");

  let text = document.createElement("h3");
  text.append("Img Path:");

  nodeSrc.appendChild(text);

  let imgSrc = document.createElement("input");
  imgSrc.setAttribute("input", "text");
  imgSrc.setAttribute("class", "img-src");

  nodeSrc.appendChild(imgSrc);
  div.appendChild(nodeSrc);

  let nodeText = document.createElement("label");

  let imgText = document.createElement("h3");
  imgText.append("Img Text:");

  nodeText.appendChild(imgText);

  let imgInput = document.createElement("input");
  imgInput.setAttribute("input", "text");
  imgInput.setAttribute("class", "img-input");

  nodeText.appendChild(imgInput);
  div.appendChild(nodeText);

  let rmButton = document.createElement("button");
  rmButton.setAttribute("type", "button");
  rmButton.setAttribute("onclick", "removeElement(event)");
  rmButton.append("Remove Element");

  div.appendChild(rmButton);

  document.getElementById("blog-content-container").appendChild(div);
}

function removeElement(event) {
  event.target.parentElement.remove();
}

async function sendForm() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let date = document.querySelector("input[type='date']");
  let location = document.getElementById("location").value;
  let password = document.getElementById("password-input").value;

  let content = [];

  let data = document.querySelectorAll("#blog-content-container > *");

  console.dir(data);

  data.forEach((element) => {
    if (element.classList.contains("img-container")) {
      let addContent = {
        type: "img",
      };
      let childs = element.children;

      for (let i = 0; i < childs.length; i++) {
        if (childs[i].tagName == "LABEL") {
          let input = childs[i].lastElementChild;

          addContent[input.className === "img-src" ? "path" : "text"] =
            input.value;
        }
      }

      content.push(addContent);
    } else if (element.classList.contains("paragraf-container")) {
      let addContent = {
        type: "txt",
      };
      let childs = element.children;

      for (let i = 0; i < childs.length; i++) {
        if (childs[i].tagName == "LABEL") {
          let input = childs[i].lastElementChild;

          addContent[input.className === "paragraf-title" ? "title" : "text"] =
            input.value;
        }
      }

      content.push(addContent);
    }
  });

  console.log(content);

  const res = await fetch("api/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      author: author,
      location: location,
      date: date.valueAsString,
      content: [],
      password: password,
    }),
  });

  if (!res.ok) {
  }
}
