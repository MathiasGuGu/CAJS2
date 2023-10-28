import { validateForm } from "./modules/forms.mjs";
import { checkNavbarState } from "./modules/navbar.mjs";
import register from "./modules/register.mjs";

checkNavbarState();

const registerForm = document.querySelector("#registerForm");
const registerName = document.querySelector("#registerName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const registerAvatar = document.querySelector("#registerAvatar");
const registerBanner = document.querySelector("#registerBanner");
const errorName = document.querySelector("#errorName");
const errorEmail = document.querySelector("#errorEmail");
const errorPassword = document.querySelector("#errorPassword");

console.log(registerName.classList);

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const avatar = e.target[3].value;
  const banner = e.target[4].value;

  const errors = validateForm(name, email, password, avatar, banner);
  console.log(!errors);
  if (Object.keys(errors).length === 0) {
    await register(name, email, password, avatar, banner);
    window.location.replace("/login.html");
  }
  if (errors.name) {
    registerName.classList.add("border-red-600");
    errorName.classList.remove("hidden");
    errorName.innerText = errors.name;
  } else {
    errorName.classList.add("hidden");
  }
  if (errors.email) {
    registerEmail.classList.add("border-red-600");
    errorEmail.classList.remove("hidden");

    errorEmail.innerText = errors.email;
  } else {
    errorEmail.classList.add("hidden");
  }
  if (errors.password) {
    registerPassword.classList.add("border-red-600");
    errorPassword.classList.remove("hidden");

    errorPassword.innerText = errors.password;
  } else {
    errorPassword.classList.add("hidden");
  }
});
