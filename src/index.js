import "./style.css";
import { validator } from "./validator";

const domElement = {
  email: document.getElementById("email"),
  country: document.getElementById("country"),
  postalCode: document.getElementById("postal-code"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("conf-password"),
  submitButton: document.querySelector(".submit-button"),
};

domElement["email"].addEventListener("input", () => validator(domElement["email"], "email"));

domElement.submitButton.addEventListener("click", (e) => {
    if (!validator()) {
      e.preventDefault();
    } 
});
