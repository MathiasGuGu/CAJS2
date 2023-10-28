import "/style.css";

import { checkNavbarState } from "./modules/navbar.mjs";
import { getAllUsersPosts, getUserProfile } from "./modules/user.mjs";
import { addPosts } from "./modules/post.mjs";
import { asyncCall } from "./modules/api.mjs";

const id = window.location.href.split("=")[1];

const isOwnerPost = localStorage.getItem("name") === id;

const userPostsContainer = document.querySelector("#userPostsContainer");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const banner = document.querySelector("#banner");
const avatar = document.querySelector("#avatar");
const postCount = document.querySelector("#postCount");
const followCount = document.querySelector("#followCount");
const followerCount = document.querySelector("#followerCount");

const modal = document.querySelector("#modal");
const backdrop = document.querySelector("#backdrop");
const modalText = document.querySelector("#modalText");
const closeModal = document.querySelector("#closeModal");

const avatarInput = document.querySelector("#avatarInput");
const avatarSubmit = document.querySelector("#avatarSubmit");

let imageData = {
  avatar: false,
  banner: false,
};

checkNavbarState();

const getUserData = async () => {
  const data = await getUserProfile(id);
  name.innerText = data?.name;
  email.innerText = data?.email;
  postCount.innerText = data?._count.posts;
  followCount.innerText = data?._count.following;
  followerCount.innerText = data?._count.followers;
  document.title = data?.name + " | Profile";

  banner.src = data?.banner;
  avatar.src = data?.avatar;
  return data;
};

const getUserPosts = async () => {
  const data = await getAllUsersPosts(id);
  data.length < 1
    ? (userPostsContainer.innerHTML = "<h2>This user has no posts yet...</h2>")
    : null;
  addPosts(data, userPostsContainer);
};

getUserPosts();
getUserData();

avatar.addEventListener("click", () => {
  if (isOwnerPost) {
    imageData.avatar = true;
    modalText.innerText = "Change avatar";
    modal.style.display = "flex";
    backdrop.style.display = "flex";
  }
});

banner.addEventListener("click", () => {
  if (isOwnerPost) {
    imageData.banner = true;
    modalText.innerText = "Change banner";
    modal.style.display = "flex";
    backdrop.style.display = "flex";
  }
});

closeModal.addEventListener("click", () => {
  imageData.banner = false;
  imageData.avatar = false;

  modal.style.display = "none";
  backdrop.style.display = "none";
});

backdrop.addEventListener("click", () => {
  imageData.banner = false;
  imageData.avatar = false;
  modal.style.display = "none";
  backdrop.style.display = "none";
});
let avatarData;
avatarInput.addEventListener("change", (event) => {
  avatarData = event.target.value;
});

avatarSubmit.addEventListener("click", async () => {
  modal.style.display = "none";
  backdrop.style.display = "none";
  imageData.avatar ? localStorage.setItem("avatar", avatarData) : null;

  const data = await asyncCall(
    `/social/profiles/${id}/media`,
    "PUT",
    imageData.avatar
      ? JSON.stringify({ avatar: avatarData })
      : imageData.banner
      ? JSON.stringify({ banner: avatarData })
      : null
  );
});
