import "/style.css";

import signIn from "./modules/login.mjs";
import { checkNavbarState } from "./modules/navbar.mjs";

const addPostForm = document.querySelector("#addPostForm");

checkNavbarState();

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  signIn(`${email}`, `${password}`);
});
