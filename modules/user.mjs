import "/style.css";

import { asyncCall } from "./api.mjs";

export const isUserLoggedIn = () => {
  const loggedIn = localStorage.getItem("access_token") !== null;
  if (!loggedIn) return false;
  return true;
};

export const getUserProfile = async (name) => {
  const data = await asyncCall(`/social/profiles/${name}`, "GET");
  return data;
};

export const getAllUsersPosts = async (name) => {
  const data = await asyncCall(
    `/social/profiles/${name}/posts` +
      "?_author=true&_comments=true&_reactions=true",
    "GET"
  );
  return data;
};

export const getAllUsers = async () => {
  const data = await asyncCall("/social/profiles", "GET");
  return data;
};

export const followUser = async (name) => {
  const data = asyncCall(`/social/profiles/${name}/follow`);
  return data;
};
export const unfollowUser = async (name) => {
  const data = asyncCall(`/social/profiles/${name}/unfollow`);
  return data;
};

export const updateMedia = async (name, body) => {
  const data = asyncCall(`/social/profiles/${name}/media`, "PUT", body);
  return data;
};
