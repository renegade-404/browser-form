import "./style.css";
import { liveValidation, globalValidation } from "./validator";


const submitButton = document.querySelector(".submit-button");
const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");
const select = document.getElementById("country");

inputs.forEach(input => {
  input.addEventListener("input", () => {
    liveValidation(input, input.id);
  });
})

select.addEventListener("change", () => {
  const postalCode = document.getElementById("postal-code");
  if (postalCode.hasAttribute("disabled")) postalCode.removeAttribute("disabled");
  liveValidation(postalCode, "postal-code");
})

submitButton.addEventListener("click", (e) => {
  globalValidation(inputs);
  if (!form.checkValidity()) {
    e.preventDefault();
  } 
});
