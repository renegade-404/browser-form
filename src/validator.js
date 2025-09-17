export const validator = (input, inputType) => {
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
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
    },
    "password-confirmation": {
      valueMissing: "Please confirm your password.",
      customError: "Passwords do not match.", // you’d set this with setCustomValidity
    },
  };

  const errorFunction = {
    "postal-code": () => {
      const country = document.getElementById("country");
      const postalCodeField = input;
      const constraints = {
        pl: ["^(CH-)?\\d{4}$", "e.g. CH-1950 or 1950"],
        jp: ["^(F-)?\\d{5}$", "e.g. F-75012 or 75012"],
        de: ["^(D-)?\\d{5}$", "e.g. D-12345 or 12345"],
        fin: [
          "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
          "Must have exactly 4 digits",
        ],
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
    if (input && inputType) {
      error.textContent = "";
    }
    const errorFn = errorFunction[inputType]();
    if (!errorFn) {
      return false;
    }
  }

  return isError();
};

//TODO:
// if input not focused: errorSpan = ""
// if country changed: postalCode placeholder change immediately
// figure out how to handle select event so postal placeholder changes
// loop input elements
