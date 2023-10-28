import "/style.css";

import { getSinglePost, editPost, deletePost } from "../modules/post.mjs";
import { checkNavbarState } from "../modules/navbar.mjs";
checkNavbarState();

const body = document.querySelector("#postBody");
const title = document.querySelector("#postTitle");
const tagsContainer = document.querySelector("#postTagsContainer");
const postImg = document.querySelector("#postImg");
const author = document.querySelector("#postAuthor");
const postAuthorImg = document.querySelector("#postAuthorImg");
const postTagsContainer = document.querySelector("#postTagsContainer");
const deleteBtn = document.querySelector("#deleteBtn");

const form = document.querySelector("#editPostForm");
const editBtn = document.querySelector("#editBtn");
const backdrop = document.querySelector("#backdrop-container");
const modalContainer = document.querySelector("#modal-container");

const formTitle = document.querySelector("#formTitle");
const postText = document.querySelector("#postText");
const postImgUrl = document.querySelector("#postImgUrl");

const id = window.location.href.split("=")[1];
const data = await getSinglePost(id);

const isUsersPost = data.author.email === localStorage.getItem("email");

if (isUsersPost) {
  editBtn.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");
}

postAuthorImg.src = data.author.avatar;
formTitle.placeholder = data.title;
postText.placeholder = data.body;
document.title = data.title + " | Post";
data.media.length > 0
  ? (postImg.src = data.media)
  : postImg.classList.add("hidden");

data.tags.map((tag) => {
  postTagsContainer.innerHTML += `<span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${tag}</span>`;
});

postImgUrl.placeholder = data.media;

body.textContent = data.body;
title.textContent = data.title;
author.textContent = data.author.name;

editBtn.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
});

backdrop.addEventListener("click", () => {
  backdrop.classList.add("hidden");
  modalContainer.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const media = e.target[0].value;
  const title = e.target[1].value;
  const tags = e.target[2].value;
  const body = e.target[3].value;
  editPost(id, title, body, tags, media);

  backdrop.classList.add("hidden");
  modalContainer.classList.add("hidden");
});

deleteBtn.addEventListener("click", async () => {
  await deletePost(id);
  window.location.replace("/feed.html");
});

data.tags.map((tag) => {
  tagsContainer.textContent += tag;
});
