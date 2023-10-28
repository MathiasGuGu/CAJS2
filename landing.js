import "/style.css";

import { isUserLoggedIn } from "./modules/user.mjs";
import { checkNavbarState } from "./modules/navbar.mjs";

const newUserSection = document.querySelector("#newUserSection");
const returningUserSection = document.querySelector("#returningUserSection");

if (isUserLoggedIn()) {
  newUserSection.classList.add("hidden");
  returningUserSection.classList.remove("hidden");
}

checkNavbarState();
