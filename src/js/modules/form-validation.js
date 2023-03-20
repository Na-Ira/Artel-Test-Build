/**
 * Form validation
 */
export function formValidation() {
  //   const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formInputs = document.querySelectorAll(".contact-form-field");
  const checkBox = document.getElementById("checkField");
  const submitButton = document.getElementById("submit");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const formCaptcha = document.getElementById("formCaptcha");
  const submitBlock = document.getElementById("submitBlock");

  // Called when the value in the text field changes
  nameInput.addEventListener("input", () => {
    validateName();
    checkFormValidity();
  });

  // Called when the value in the email field changes
  emailInput.addEventListener("input", () => {
    validateEmail();
    checkFormValidity();
  });

  // Called when the value in the message field changes
  messageInput.addEventListener("input", () => {
    validateMessage();
    checkFormValidity();
  });

  // Called when the value in the checkbox field changes
  checkBox.addEventListener("input", () => {
    validateCheckbox();
    validateForm();
    checkFormValidity();
  });

  /**
   * Add artifacts to the ".contact-form-field-item" field group
   * with the appropriate status when validating fields
   */
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        // If is valid
        input
          .closest(".contact-form-field-item")
          .setAttribute("data-status", "success");
      } else {
        // If is not valid
        input
          .closest(".contact-form-field-item")
          .setAttribute("data-status", "error");
      }
    });
  });

  // Name validation
  function validateName() {
    const messageError = document.getElementById("error-name");

    if (nameInput.value.trim() === "") {
      nameInput.setCustomValidity("Please complete this name field.");
      messageError.innerHTML = "Please complete this name field.";
    } else {
      nameInput.setCustomValidity("");
      messageError.innerHTML = "";
    }
  }

  // Email validation
  function validateEmail() {
    const messageError = document.getElementById("error-email");

    if (emailInput.value.trim() === "") {
      emailInput.setCustomValidity("Please complete this email field.");
      messageError.innerHTML = "Please complete this email field.";
    } else if (!isValidEmail(emailInput.value)) {
      emailInput.setCustomValidity("This email does not seem to look right.");
      messageError.innerHTML = "This email does not seem to look right.";
    } else {
      emailInput.setCustomValidity("");
      messageError.innerHTML = "";
    }
    /**
     * Adding/removing data attribute when email field incorrect
     */
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!isValidEmail(emailInput.value)) {
          // If is not valid
          input
            .closest(".contact-form-field")
            .setAttribute("data-invalid", "incorrect");
          errorMessage.innerHTML =
            "<p>Something went wrong try again later.</p>";
        } else {
          // If is valid
          input.closest(".contact-form-field").removeAttribute("data-invalid");
          errorMessage.innerHTML = "";
        }
      });
    });
  }

  // Checking the correctness of the email address
  function isValidEmail(email) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  // Message validation
  function validateMessage() {
    const messageError = document.getElementById("error-mess");

    if (messageInput.value.trim() === "") {
      messageInput.setCustomValidity("Please complete this message field.");
      messageError.innerHTML = "Please complete this message field.";
    } else {
      messageInput.setCustomValidity("");
      messageError.innerHTML = "";
    }
  }

  /**
   * State 1. If the fields are not validate
   */
  function validateForm() {
    const messageError = document.getElementById("error-check");

    if (
      !nameInput.checkValidity() ||
      !emailInput.checkValidity() ||
      !messageInput.checkValidity()
    ) {
      checkBox.setCustomValidity("You must fill in the required fields");
      messageError.innerHTML = "You must fill in the required fields.";
      submitBlock.setAttribute("data-status", "error");
      formCaptcha.setAttribute("data-fields", "incorrect");
    } else {
      validateCheckbox();
    }
  }

  /**
   * State 2. If the fields are not validate & checkbox is not checked
   */
  function validateCheckbox() {
    const messageError = document.getElementById("error-check");

    if (checkBox.required && !checkBox.checked) {
      checkBox.setCustomValidity("You must check this box to submit the form");
      messageError.innerHTML = "You must check this box to submit the form.";
      submitBlock.setAttribute("data-status", "error");
    } else if (
      checkBox.checked &&
      !nameInput.checkValidity() &&
      !emailInput.checkValidity() &&
      !messageInput.checkValidity()
    ) {
      return validateForm();
    } else {
      checkBox.setCustomValidity("");
      messageError.innerHTML = "";
      submitBlock.setAttribute("data-status", "success");
      formCaptcha.removeAttribute("data-fields");
    }
  }

  // On-the-fly data validation of the fields
  nameInput.addEventListener("input", validateForm);
  emailInput.addEventListener("input", validateForm);
  messageInput.addEventListener("input", validateForm);
  checkBox.addEventListener("change", validateCheckbox);

  // Checking the overall validity of the form
  function checkFormValidity() {
    if (
      nameInput.checkValidity() &&
      emailInput.checkValidity() &&
      messageInput.checkValidity() &&
      checkBox.checkValidity()
    ) {
      submitButton.disabled = false;
      successMessage.innerHTML =
        "<p>Your form has been successfully completed.</p>";
    } else {
      submitButton.disabled = true;
      successMessage.innerHTML = "";
    }
  }
}
