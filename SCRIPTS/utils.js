export function checkToken() {
  const refresh_token = localStorage.getItem("refresh_token");

  return Boolean(refresh_token);
}

export function redirect(path) {
  window.location.href = path;
}

export function logout() {
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("access_token");

  redirect("/login.html");
}
