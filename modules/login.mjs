import { asyncCall } from "./api.mjs";

const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/<id>",
};

export async function signIn(email, password) {
  try {
    const data = await asyncCall(
      API_ENDPOINTS.login,
      "POST",
      JSON.stringify({
        email,
        password,
      })
    );
    window.location.replace("/feed.html");

    if (!data.errors) {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("avatar", data.avatar);
      login_btn.classList.add("hidden");
      register_btn.classList.add("hidden");
      navbarUserIcon.classList.remove("hidden");
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default signIn;
