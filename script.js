let nav = document.querySelector("nav");
let hero = document.querySelector(".hero");
let learn = document.getElementById("learn");
let faq = document.getElementById("faq");
let footer = document.querySelector("footer");

let form = document.getElementById("login-form");

form.addEventListener("submit", function () {
  let pass = document.getElementById("pass").value;
  console.log(pass);
  if (pass === "123456") {
    nav.classList.remove("hidden");
    footer.classList.remove("hidden");
    learn.classList.remove("hidden");
    faq.classList.remove("hidden");
    hero.classList.add("hidden");
    nav.classList.add("flex");
    footer.classList.add("flex");
  } else window.alert("Wrong Password!!!");
});
