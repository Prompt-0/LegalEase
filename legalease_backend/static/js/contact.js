document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default HTML form submission

      // Show submitting message
      if (formStatus) {
        formStatus.textContent = "Submitting your message...";
        formStatus.classList.remove("hidden", "success", "error");
      }

      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Send data to the API
      fetch("/api/contact/submit/", {
        // <-- THIS IS THE FIX
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            // If server returns an error (like 400 or 500)
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((result) => {
          // Success!
          console.log("Success:", result);
          if (formStatus) {
            formStatus.textContent =
              "Message sent successfully! We will get back to you soon.";
            formStatus.classList.add("success");
          }
          contactForm.reset(); // Clear the form
        })
        .catch((error) => {
          // Error!
          console.error("Error:", error);
          if (formStatus) {
            formStatus.textContent =
              "An error occurred. Please try again later.";
            formStatus.classList.add("error");
          }
        });
    });
  }

  // --- Logic for the helpline numbers (already in your file) ---
  // (No fetch calls here, so no fixes needed)
  const helplines = {
    // ...
  };
  // ... all the helpline rendering logic
});
