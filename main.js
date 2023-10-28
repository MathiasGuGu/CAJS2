import "/style.css";

import { checkNavbarState } from "./modules/navbar.mjs";
import { addPosts, createPost, getAllPosts } from "./modules/post.mjs";

checkNavbarState();
const posts_container = document.querySelector("#posts_container");
const loading_container = document.querySelector("#loading_container");
const postForm = document.querySelector("#addPostForm");
const newest = document.querySelector("#newest");
const oldest = document.querySelector("#oldest");
const modal = document.querySelector("#backdrop-container");
const modalbtn = document.querySelector("#modalbtn");
const modalContainer = document.querySelector("#modal-container");
modal.addEventListener("click", () => {
  hidemodal();
});
modalbtn.addEventListener("click", () => {
  hidemodal();
});
const hidemodal = () => {
  modal.classList.add("hidden");
  modalContainer.classList.add("hidden");
};
const addPostBtn = document.querySelector("#addPostBtn");
addPostBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modalContainer.classList.remove("hidden");
});

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const media = e.target[0].value;
  const title = e.target[1].value;
  const tags = e.target[2].value;
  const body = e.target[3].value;

  createPost(title, body, tags, media);
});

let limit = 0;
let isLoadingMorePosts = false;

let isInitialLoad = true;

let currentFilter = "newest";

const data = await getAllPosts(
  loading_container,
  limit,
  isInitialLoad,
  "desc",
  "created"
);

const dataObj = { data };

const showFilteredPosts = (filteredData) => {
  posts_container.innerHTML = "";
  addPosts(filteredData, posts_container);
};

newest.addEventListener("click", async (e) => {
  e.preventDefault();
  limit = 0;

  currentFilter = "newest";
  const filteredData = await getAllPosts(
    loading_container,
    limit,
    isInitialLoad,
    "desc",
    "created"
  );
  showFilteredPosts(filteredData);
});

oldest.addEventListener("click", async (e) => {
  e.preventDefault();
  limit = 0;

  currentFilter = "oldest";
  const filteredData = await getAllPosts(
    loading_container,
    limit,
    isInitialLoad,
    "asc",
    "created"
  );
  showFilteredPosts(filteredData);
});

/* 
 TODO: Legg til filter by tag funksjonalitet hvis du har tid
 TODO: Finn ut av om du har tid.
 INFO: Har ikke tid.
*/

addPosts(dataObj.data, posts_container);

const loadMorePosts = async () => {
  if (isLoadingMorePosts) {
    return;
  }
  isLoadingMorePosts = true;

  limit += 10;

  if (currentFilter === "newest") {
    const newPosts = await getAllPosts(
      loading_container,
      limit,
      isInitialLoad,
      "desc",
      "created"
    );
    addPosts(newPosts, posts_container);
  } else if (currentFilter === "oldest") {
    const newPosts = await getAllPosts(
      loading_container,
      limit,
      isInitialLoad,
      "asc",
      "created"
    );
    addPosts(newPosts, posts_container);
  } else {
    const newPosts = await getAllPosts(
      loading_container,
      limit,
      isInitialLoad,
      "desc",
      "created"
    );
    addPosts(newPosts, posts_container);
  }

  isLoadingMorePosts = false;
};

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMorePosts();
  }
});
