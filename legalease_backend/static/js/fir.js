document.addEventListener("DOMContentLoaded", () => {
  const firForm = document.getElementById("fir-form");
  const formStatus = document.getElementById("form-status");
  const loadButton = document.getElementById("load-saved-fir-btn");

  // We are not using localStorage anymore, so let's hide the load button.
  if (loadButton) {
    loadButton.style.display = "none";
  }

  if (firForm) {
    firForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Stop default form submission

      // Show submitting message
      formStatus.textContent = "Submitting your FIR...";
      formStatus.classList.remove("hidden", "success", "error");

      const formData = new FormData(firForm);
      const data = {
        complainant_name: formData.get("complainant-name"),
        father_name: formData.get("father-name"),
        email: formData.get("complainant-email"),
        phone: formData.get("complainant-phone"),
        address: formData.get("complainant-address"),
        district: formData.get("district"),
        subject: formData.get("subject"),
        details: formData.get("details-of-incident"),
      };

      // Send data to the API
      fetch("/api/fir/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            // Get error details from server if possible
            return response.json().then((err) => {
              throw new Error(JSON.stringify(err));
            });
          }
          return response.json();
        })
        .then((result) => {
          // Success!
          console.log("Success:", result);
          formStatus.textContent = `FIR submitted successfully. Your reference ID is: ${result.id}`;
          formStatus.classList.add("success");
          firForm.reset(); // Clear the form
        })
        .catch((error) => {
          // Error!
          console.error("Error:", error);
          formStatus.textContent =
            "An error occurred during submission. Please check your inputs and try again.";
          formStatus.classList.add("error");
        });
    });
  }
});
