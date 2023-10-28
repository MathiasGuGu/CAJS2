export const BASE_URL = "https://api.noroff.dev/api/v1";

export const asyncCall = async (url, method, body = "") => {
  if (method !== "PUT" && method !== "POST") {
    const req = await fetch(BASE_URL + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await req.json();
    return data;
  } else {
    const req = await fetch(BASE_URL + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
      body: body,
    });
    const data = await req.json();
    return data;
  }
};
