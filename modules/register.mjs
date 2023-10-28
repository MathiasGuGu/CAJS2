import "/style.css";

const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/<id>",
};

const register = async (name, email, password, avatar, banner) => {
  try {
    const response = await fetch(API_ENDPOINTS.base + API_ENDPOINTS.register, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar,
        banner,
      }),
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default register;
