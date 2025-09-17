import "./style.css";
import { validator } from "./validator";


const submitButton = document.querySelector(".submit-button");
const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
  input.addEventListener("input", () => validator(input, input.id));
})

submitButton.addEventListener("click", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
    } 
});
