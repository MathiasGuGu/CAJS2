import signOut from "./signout.mjs";
import { isUserLoggedIn } from "./user.mjs";
// /social/posts
const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/",
};
const login_btn = document.querySelector("#login_btn");
const register_btn = document.querySelector("#register_btn");

const navbarUserIcon = document.querySelector("#navbarUserIcon");
const navbarUserImage = document.querySelector("#navbarUserImage");
const profileDropdown = document.querySelector("#profileDropdown");
const profileLink = document.querySelector("#profileLink");

isUserLoggedIn()
  ? (profileLink.href = `/account.html?id=${localStorage.getItem("user")}`)
  : (profileLink.href = `/login/login.html`);

const signout_btn = document.querySelector("#signOutBtn");

const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const searchBackdrop = document.querySelector("#searchBackdrop");
async function getAllPosts() {
  const response = await fetch(
    API_ENDPOINTS.base + API_ENDPOINTS.all_posts + "?_author=true&",
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  const data = await response.json();

  return data;
}
const data = await getAllPosts();
searchBackdrop.addEventListener("click", () => {
  searchBackdrop.classList.add("hidden");
  searchResults.classList.add("hidden");
});

searchInput.addEventListener("click", () => {
  searchBackdrop.classList.remove("hidden");
  searchResults.classList.remove("hidden");
});

function debounce(func, wait) {
  let timeout;
  return function run(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

searchInput.addEventListener(
  "input",
  debounce((e) => {
    searchResults.innerHTML = "";
    const filtered = data.filter((data) => {
      return (
        data.body?.includes(e.target.value) ||
        data.title.includes(e.target.value)
      );
    });
    filtered.length >= 1
      ? filtered.map((results) => {
          searchResults.innerHTML += `
      <a class=" w-full h-16 flex items-center border-b border-b-blue-950" href="/posts/post.html?id=${results.id}">${results.title}</a>
      `;
        })
      : (searchResults.innerHTML =
          "<div class='w-full h-full  flex items-center justify-center'>No posts found...</div> ");
  }, 500)
);

navbarUserIcon.addEventListener("click", () => {
  if (profileDropdown.classList.contains("hidden")) {
    profileDropdown.classList.remove("hidden");
  } else {
    profileDropdown.classList.add("hidden");
  }
});

signout_btn.addEventListener("click", () => {
  signOut();
});

export function checkNavbarState() {
  if (isUserLoggedIn()) {
    navbarUserIcon.classList.remove("hidden");
    navbarUserImage.classList.remove("hidden");
    login_btn.classList.add("hidden");
    register_btn.classList.add("hidden");
    if (localStorage.getItem("avatar") !== "undefined" || null) {
      navbarUserImage.src = localStorage.avatar;
    } else {
      navbarUserImage.src =
        "https://images.unsplash.com/photo-1506792006437-256b665541e2?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
  } else {
    return null;
  }
}
