import "/style.css";

export default function signOut() {
  localStorage.clear();
  window.location.replace("/");
}
