// Skills

const skills = ["css", "typescript", "tauri", "figma", "electron", "tailwind", "flask", "html", "javascript", "express", "lua", "node", "python", "bash", "bootstrap", "bulma", "coffeescript", "discordjs", "docker", "firebase", "gitlab", "git", "github_actions", "hugo", "insomnia", "jquery", "linux", "less", "materialize", "markdown", "mongodb", "npm", "r", "yaml", "vscode", "pug", "canva", "codepen", "github", "foundation", "nodemon", "postman"];

skills.forEach((e) => {
  document.querySelector("#tags ul").innerHTML += `<li><a href="#skills-globe"><img src="./images/${e}.svg" alt="${e}" /></a></li>`;
  document.querySelector("#skills .main ul").innerHTML += `<li data-tooltip="${e}"><img src="./images/${e}.svg" alt="${e}" /></li>`;
});

// Stars

const numberOfStars = Math.floor((window.innerWidth + window.innerHeight) / 50);
const starContainer = document.createElement("div");
starContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;
document.querySelector("#landing").appendChild(starContainer);

function createStar() {
  const star = document.createElement("div");
  const starSize = Math.random() * 3 + 1;
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  star.classList.add("star");
  star.style.width = `${starSize}px`;
  star.style.height = `${starSize}px`;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  star.style.animation = `star ${Math.floor(Math.random() * 10) + 3}s ease infinite`;
  starContainer.appendChild(star);
}

for (let i = 0; i < numberOfStars; i++) {
  createStar();
}

// DOM Loaded + Extra

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".wiper").style.transform = "translate(-100%)";
    document.querySelector("nav").style.opacity = "1";
    document.querySelector("#landing .main").style.opacity = "1";
  }, 10);
});

const handleFeatureHover = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left;
  y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const card of document.querySelectorAll("#contact .box")) {
  card.onmousemove = (e) => handleFeatureHover(e);
}

// Mutation Observer

const anims = {
  scale: function (element) {
    if (element.dataset.done) return;
    element.dataset.done = "true";
    setTimeout(() => {
      element.style.scale = "1";
    }, 10);
  },
};

function isInView(element, margin = 100) {
  const r = element.getBoundingClientRect();
  return r.top >= 0 && r.top <= document.documentElement.clientHeight + margin;
}

function checkElementsInView() {
  document.querySelectorAll("[data-anim]").forEach((element) => {
    const funcName = element.getAttribute("data-anim");
    if (anims[funcName] && isInView(element)) {
      if (element.getAttribute("data-margin")) {
        anims[funcName](element, Number(element.getAttribute("data-margin")));
      } else {
        anims[funcName](element);
      }
    }
  });
}

function createObserverForElement(element) {
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains("anim")) {
            const funcName = node.getAttribute("data-anim");
            if (anims[funcName] && isInView(node)) {
              anims[funcName](node);
            }
          }
        });
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  element.observer = observer;
}

document.querySelectorAll("[data-anim]").forEach((element) => {
  createObserverForElement(element);
});

const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains("anim")) {
          createObserverForElement(node);
        }
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Game

function toggleGameModal() {
  const g = document.querySelector("#game");
  if (g.classList.contains("active")) return window.location.reload();

  const d = document.querySelector("dialog");
  d.showModal();
  document.body.classList.add("unscroll");

  setTimeout(() => {
    d.close();
    g.classList.add("active");
    g.querySelector(".initial").classList.add("active");
    g.querySelector(".main").classList.remove("active");
  }, 5000);
}

function startGame() {
  const g = document.querySelector("#game");
  g.querySelector(".initial").classList.remove("active");
  g.querySelector(".main").classList.add("active");
  const c = Math.floor(Math.random() * 20) + 1;
  const boxCount = 20;

  for (let i = 0; i < boxCount; i++) {
    const div = document.createElement("div");
    div.innerText = i + 1;
    div.onclick = () => {
      const r = g.querySelector(".result");
      g.querySelector(".main").classList.remove("active");
      r.classList.add("active");

      if (c == i + 1) {
        r.querySelector("h1").innerHTML = "Congrats! You won!";
        r.querySelector("h3").innerHTML = "Sadly, you won :(<br>Now, you get nothing! But you can still sub 😳";
      } else {
        r.querySelector("h1").innerHTML = 'Congrats! You <span style="color: #ff2b2b;">lost</span>!';
        r.querySelector("h3").innerHTML = "Now, you have to subscribe...";
      }
    };
    g.querySelector(".main .boxes").append(div);
  }
}

// Utility

function copyEmail(e) {
  navigator.clipboard.writeText("axoraxmail@gmail.com");
  e.innerText = "✅ Copied!";
  setTimeout(() => {
    e.innerText = "Email: axoraxmail@gmail.com";
  }, 2000);
}

// Meteor Rain

function meteorRain() {
  const meteor = document.createElement("div");
  meteor.className = "meteor";
  meteor.style.left = `${Math.random() * 150}%`;

  const electricSurge = document.getElementById("meteor-rain");
  const electricSurgeRect = electricSurge.getBoundingClientRect();
  const meteorRect = meteor.getBoundingClientRect();

  if (meteorRect.left + meteorRect.width < electricSurgeRect.left + electricSurgeRect.width) {
    electricSurge.appendChild(meteor);
  }

  setTimeout(() => {
    meteor.remove();
  }, 2000);
}

setInterval(meteorRain, 1600);

// Window events

window.addEventListener("scroll", checkElementsInView);

window.addEventListener("load", checkElementsInView);

window.onload = function () {
  try {
    globe.Start("skills-globe", "tags", {
      textColour: "#ffffff",
      outlineColour: "transparent",
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.03,
      minSpeed: 0.01,
      initial: [0.1, -0.1],
      shape: "sphere",
      zoom: 1,
      wheelZoom: false,
      clickToFront: 1000,
    });
  } catch (e) {
    console.log(e);
  }
};

window.addEventListener("resize", function () {
  while (starContainer.firstChild) {
    starContainer.removeChild(starContainer.firstChild);
  }

  for (let i = 0; i < numberOfStars; i++) {
    createStar();
  }
});
