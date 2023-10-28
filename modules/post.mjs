import "/style.css";

import { BASE_URL, asyncCall } from "./api.mjs";

const API_ENDPOINTS = {
  base: "https://api.noroff.dev/api/v1",
  register: "/social/auth/register",
  login: "/social/auth/login",
  all_posts: "/social/posts",
  single_post: "/social/posts/",
};

export async function getAllPosts(
  loading_container,
  limit = 15,
  isInitialLoad,
  sortOrder = "desc",
  sort = "_count.reactions"
) {
  loading_container.classList.remove("hidden");

  try {
    const data = await asyncCall(
      API_ENDPOINTS.all_posts +
        `?_author=true&_comments=true&_reactions=true&limit=${20}&offset=${limit}&sortOrder=${sortOrder}&sort=${sort}`,
      "GET"
    );

    loading_container.classList.add("hidden");

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export const editPost = async (id, title, body, tags, media) => {
  try {
    const data = await asyncCall(
      "/social/posts/" + id,
      "PUT",
      JSON.stringify({
        title,
        body,
        tags: [tags],
        media,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const getSinglePost = async (id) => {
  try {
    const data = await asyncCall(
      API_ENDPOINTS.single_post +
        id +
        "?_author=true&_comments=true&_reactions=true",
      "GET"
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (title, body, tags, media) => {
  if (title.length < 1) {
    throw new Error("Title is required to post");
  }

  try {
    const response = await fetch(API_ENDPOINTS.base + "/social/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        title,
        body,
        tags: [tags],
        media,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error(error);
  }
};
export const deletePost = async (id) => {
  if (id.length < 1) {
    throw new Error("Title is required to post");
  }

  try {
    const response = await fetch(API_ENDPOINTS.base + `/social/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const addPosts = async (data, container) => {
  if (!data.length > 0) {
    return;
  }

  data.map((post) => {
    const isUserPost = post.author?.email === localStorage.getItem("email");
    container.innerHTML += `
      <div
      key="${post?.id}"
      class="flex-grow w-[90vw] bg-white border  p-6 flex flex-col gap-3 max-w-3xl relative shadow border-theme_dark/10 rounded-t-md"
    >
    ${
      isUserPost
        ? `<a href='/posts/post.html?id=${post?.id}' class='z-40 absolute top-6 right-12 border text-sm hover:bg-theme_dark hover:text-white duration-200 border-theme_dark text-theme_dark h-8 rounded px-5 flex items-center justify-center'>Edit Post</a>`
        : ""
    }

    <div class="flex flex-col  justify-start gap-3 w-full">
      <div class="flex items-center justify-start gap-3 w-full h-14 ">
          <a href="/account.html?name=${
            post?.author.name
          } "class="w-12 h-12 rounded-full bg-red-300 border">
          ${
            post?.author.avatar
              ? `<img class="w-full h-full rounded-full" src="${post?.author.avatar}" alt="avatar"/>`
              : `<img class="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>`
          }
          </a>
        <h2 class="text-theme_dark font-bold text-xl">
        ${post?.title}
        </h2>
      <p class="text-sm text-gray-600 font-medium">${post?.author.name}</p>
       
      </div>
      <a href="/posts/post.html?id=${post?.id}"
      class="text-theme_dark text-sm max-h-12 truncate overflow-hidden">
      ${post?.body}

      </a>
      <div class="text-sm font-light flex gap-4 text-theme_dark">
      ${
        Array.isArray(post.tags) && post.tags.length > 0
          ? post.tags.map(
              (tag, index) => `
                <div class="flex gap-2  h-12 w-12">
                  <p class="text-sm bg-blue-400 text-blue-950 rounded py-1 px-3">${tag}</p>
                </div>
              `
            )
          : "<div class='text-sm font-thin'> No comments found. </div>"
      }
      </div>
      </div>
      <!-- Button form -->


      <!-- Button form -->
      
      <div
        class="w-full aspect-video border-t flex items-center justify-center ${
          post?.media ? "" : "hidden"
        }"
      >
        <img class="w-[95%] aspect-video  rounded" src="
      ${post?.media}
      "></img>
      </div>

      <div class="flex flex-col gap-4 px-4 text-theme_dark pb-3">
        <div class="w-full h-[1px] bg-theme_dark/10"></div>
        <div class="w-full px-2 pt-3 flex flex-col h-auto  ">
        ${
          Array.isArray(post.comments) && post.comments.length > 0
            ? post.comments.slice(0, 2).map(
                (comment, index) => `
                  <div class="flex flex-col gap-2  h-auto w-auto">
                    <p class="text-sm font-medium">${comment.author.name}</p>
                    <p class="text-sm border-b">${comment?.body}</p>
                  </div>
                `
              )
            : "<div class='text-sm font-thin'> No comments found. </div>"
        }
        </div>
        <div class="text-sm flex gap-2">
          <p class="truncate"></p>
          <a
            href="/posts/post.html?id=${post?.id}"
            class="text-blue-900"
            >...more</a
          >
        </div>
        <!-- Comment -->
      </div>
    </div>
      `;
  });
};
