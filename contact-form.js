const form = document.querySelector("#contact-form");

form.onsubmit = async (e) => {
  e.preventDefault();

  const loadingModal = document.querySelector(".loading-overlay");
  const successModal = document.querySelector(".success-overlay");
  const errorModal = document.querySelector(".error-overlay");

  try {
    const fullName = encodeURIComponent(
      form.querySelector("[name='name']").value
    );
    const emailAddress = encodeURIComponent(
      form.querySelector("[name='email']").value
    );
    const message = encodeURIComponent(
      form.querySelector("[name='message']").value
    );

    showModal(loadingModal);

    const response = await fetch(
      "api/sendEmail.php?name=" +
        fullName +
        "&email=" +
        emailAddress +
        "&msg=" +
        message
    );

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    form.reset();
    showModal(successModal);
    setTimeout(() => {
      hideModal(successModal);
    }, 3000);

    const data = await response.json();
    // console.log("Success!");
    // console.log("data: ", data);
  } catch (error) {
    showModal(errorModal);
    setTimeout(() => {
      hideModal(errorModal);
    }, 3000);
  }

  hideModal(loadingModal);
};
