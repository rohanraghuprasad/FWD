const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");

showSignup.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("newUser").value;
  const pass = document.getElementById("newPass").value;

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);
  alert("Account created successfully!");
  signupForm.reset();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (username === storedUser && password === storedPass) {
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
});
