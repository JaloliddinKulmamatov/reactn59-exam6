import { checkToken, redirect } from "./utils.js";

const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/index.html");
  }

  const credentials = {
    email: emailInput ? emailInput.value : '',
    password: passwordInput ? passwordInput.value : '',
  };

  if (emailInput) {
    emailInput.oninput = function (event) {
      credentials.email = event.target.value;
      console.log(credentials);
    };
  }

  if (passwordInput) {
    passwordInput.oninput = function (event) {
      credentials.password = event.target.value;
      console.log(credentials);
    };
  }

  if (form) {
   form.onsubmit = async function (event) {
      event.preventDefault();
      login(credentials);
    };
  }
});

async function login(credentials) {
  const api_url = "https://api.escuelajs.co/api/v1/auth/login";
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.statusCode === 401) {
      alert('Login or password is incorrect');
    } else {
      const hasToken = checkToken();
      const { access_token, refresh_token } = data;
      sessionStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      if (hasToken) {
        redirect("/index.html");
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}
