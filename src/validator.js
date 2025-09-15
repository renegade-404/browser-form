export const validator = (input, inputType) => {
  const error = document.querySelector(`#${inputType} + span.error`);   

  function getErrorMessage(errorType) {
    const messages = {
      valueMissing: "This field is required to be filled.",
      typeMismatch: "Entered value needs to be of required type.",
      tooShort: `This field should be at least ${input.minlength} characters;
      you entered ${input.value.length}`,
      tooLong: `This field should be maximum ${input.maxlength} characters;
      you entered ${input.value.length}`,
    }

    return messages[errorType];
  }

  function getFailedConstraint () {
    const validity = input.validity;
    for (const key in validity) {
      if (validity[key] === true && key !== "valid") {
        return key;
      }
    }
    return null;
  }
  
  function isError () {
    if (input && inputType) {
      const constraint = getFailedConstraint();
      error.textContent = "";
      if (constraint) {
        const errorMessage = getErrorMessage(constraint);
        error.textContent = errorMessage;
      }
    }
    return false;
  }
  
  return isError();
}