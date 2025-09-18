import "./style.css";
import { liveValidation, globalValidation } from "./validator";


const submitButton = document.querySelector(".submit-button");
const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
  input.addEventListener("input", () => liveValidation(input, input.id));
})

submitButton.addEventListener("click", (e) => {
  // globalValidation(inputs);
  if (!form.checkValidity()) {
    e.preventDefault();
  } 
});
