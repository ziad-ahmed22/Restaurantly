// Sticky Navbar And Up Icon
const upIcon = document.getElementById("up-icon");
upIcon.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});

document.addEventListener("scroll", () => {
  window.scrollY >= 40
    ? document.getElementById("navbar").classList.add("sticky")
    : document.getElementById("navbar").classList.remove("sticky");

  window.scrollY >= 800
    ? upIcon.classList.add("show")
    : upIcon.classList.remove("show");

  //  console.log(document.documentElement.scrollTop)
  //  console.log(window.scrollY)
});

//  Active Navbar
const navLinks = document.querySelectorAll("#navbar .nav-link");
const sections = document.querySelectorAll("section, header");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

document.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (document.documentElement.scrollTop >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.link === current) {
      link.classList.add("active");
    }
  });

  console.log(current);
});

// Menu
const menuLinks = document.querySelectorAll("#menu ul li");
const menuBoxes = document.querySelectorAll("#menu .box");
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    menuLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");

    menuBoxes.forEach((box) => {
      box.classList.add("hide-box");
    });
    document.querySelectorAll(e.currentTarget.dataset.food).forEach((e) => {
      e.classList.remove("hide-box");
    });
  });
});

// Specials
const specialLinks = document.querySelectorAll("#specials ul li");
const specialBoxes = document.querySelectorAll("#specials .box");
specialLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    specialLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");

    specialBoxes.forEach((box) => {
      box.classList.remove("show");
    });

    document
      .querySelector(e.currentTarget.dataset.special)
      .classList.add("show");
  });
});

// Slider Gallery
let imgsArr = document.querySelectorAll(".gallery .images img");
let imageDiv = document.querySelector(".img-slide");
let sliderCon = document.querySelector(".slider");
let bulletsDiv = document.querySelector(".bullets");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let closeBtn = document.querySelector(".close");
let imgBox = document.querySelectorAll(".gallery .images img");
let currentIndex = 0;

createSlider();
let spans = document.querySelectorAll(".bullets span");
let imgs = document.querySelectorAll(".img-slide img");

checker();
bulletsCheck();
zoomImage();
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
closeBtn.addEventListener("click", closeSlider);

function createSlider() {
  imgsArr.forEach((image, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", image.getAttribute("src"));
    img.alt = `image${index + 1}`;
    imageDiv.appendChild(img);

    let span = document.createElement("span");
    span.dataset.index = index;
    bulletsDiv.appendChild(span);
  });
}

function checker() {
  spans.forEach((span) => {
    span.classList.remove("active");
  });
  spans[currentIndex].classList.add("active");

  imgs.forEach((img) => {
    img.classList.remove("active");
  });
  imgs[currentIndex].classList.add("active");
}

function nextSlide() {
  if (currentIndex < imgsArr.length - 1) {
    currentIndex++;
    checker();
  } else {
    currentIndex = 0;
    checker();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    checker();
  } else {
    currentIndex = imgsArr.length - 1;
    checker();
  }
}

function closeSlider() {
  sliderCon.style.display = "none";
  document.body.style.overflow = "visible";
}

function bulletsCheck() {
  spans.forEach((span) => {
    span.addEventListener("click", (e) => {
      currentIndex = e.target.dataset.index;
      checker();
    });
  });
}

function zoomImage() {
  imgBox.forEach((img) => {
    img.addEventListener("click", (e) => {
      currentIndex = e.currentTarget.dataset.num - 1;
      sliderCon.style.display = "block";
      document.body.style.overflow = "hidden";
      console.log(e.currentTarget.dataset.num);
      checker();
    });
  });
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.style.overflow = "visible";
    document.body.removeChild(document.querySelector(".pre-loader"));
  }, 1500);
});
