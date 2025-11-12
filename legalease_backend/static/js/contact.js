// --- FIX: Add this helper function to get the CSRF token ---
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");
// --- End of helper function ---

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken, // <-- FIX: Add CSRF token
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
