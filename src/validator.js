export const liveValidation = (input, inputType) => {
  const error = document.querySelector(`#${inputType} + span.error`);

  const errorMessages = {
    email: {
      valueMissing: "Email is required.",
      typeMismatch: "Please enter a valid email address.",
      tooLong: () =>
        `This field should be maximum ${input.maxLength} characters; you entered ${input.value.length}.`,
    },
    "postal-code": {
      valueMissing: "Postal code is required.",
    },
    password: {
      valueMissing: "Password is required.",
      tooLong: () =>
        `This field should be maximum ${input.maxLength} characters; you entered ${input.value.length}.`,
      patternMismatch:
        "Must consist of at least: 1 upper case letter, a number, a special character and be between 8-32 characters.",
    },
    "password-confirmation": {
      valueMissing: "Please confirm your password."
    },
  };

  const errorFunctions = {
    "postal-code": () => {
      const country = document.getElementById("country");
      const postalCodeField = input;
      const constraints = {
        pl: ["^(PL-)?\\d{2}-\\d{3}$", "e.g. PL-00-001 or 00-001"],
        jp: ["^(JP-)?\\d{3}-\\d{4}$", "e.g. JP-100-0001 or 100-0001"],
        de: ["^(D-)?\\d{5}$", "e.g. D-12345 or 12345"],
        fin: ["^(FI-)?\\d{5}$", "e.g. FI-00100 or 00100"],
      };
      country.addEventListener("change", () => {
        postalCodeField.setAttribute(
          "placeholder",
          constraints[country.value][1]
        );
      });
      if (country.value !== "select") {
        const constraint = new RegExp(constraints[country.value][0], "");

        if (constraint.test(postalCodeField.value)) {
          error.textContent = "";
        } else {
          error.textContent = `The postal code doesn't match the pattern:
          ${constraints[country.value][1]}`;
        }
      } else {
        const errorMessage = getErrorMessage();
        if (errorMessage) error.textContent = errorMessage;
        else return false;
      }
    },
    email: () => {
      const errorMessage = getErrorMessage();
      if (!errorMessage) return false;
      error.textContent = errorMessage;
    },
    password: () => {
      const errorMessage = getErrorMessage();
      if (!errorMessage) return false;
      error.textContent = errorMessage;
    },
    "password-confirmation": () => {
      const passwordInput = document.getElementById("password");
      if (input.value !== passwordInput.value) {
        error.textContent = "Passwords don't match.";
      }
      const errorMessage = getErrorMessage();
      if (!errorMessage) return false;
      error.textContent = errorMessage;
    },
  };

  function getErrorMessage() {
    const validity = input.validity;
    for (const constraint in validity) {
      if (validity[constraint] === true && constraint !== "valid") {
        const errorMessage = errorMessages[inputType][constraint];
        if (constraint === "tooLong") return errorMessage();
        return errorMessage;
      }
    }
    return false;
  }

  function isError() {
    error.textContent = "";
    errorFunctions[inputType]();
    error.classList.add("active");
  }

  isError();
};

export const globalValidation = (inputs) => { // add select
  const validationMessage = document.querySelector(".global-validation");
  let notValidatedFields = [];
  inputs.forEach(input => {
    if (!input.validity.valid) notValidatedFields.push(input);
  })
  if (notValidatedFields.length === 0) {
    validationMessage.hidden = true;
  } else {
    validationMessage.textContent = `These are not validated: ${notValidatedFields}`;
    validationMessage.hidden = false;
  }
  
}

//TODO:
// if country changed: postalCode placeholder change immediately
// figure out how to handle select event so postal placeholder changes
