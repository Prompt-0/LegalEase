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
  const reportForm = document.getElementById("report-form");
  const formStatus = document.getElementById("form-status");

  if (reportForm) {
    reportForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Stop default form submission

      // Show submitting message
      if (formStatus) {
        formStatus.textContent = "Submitting your report...";
        formStatus.classList.remove("hidden", "success", "error");
      }

      // Get form data
      const formData = new FormData(reportForm);
      const data = {
        incident_type: formData.get("incident-type"),
        location: formData.get("location"),
        description: formData.get("description"),
        evidence_link: formData.get("evidence-link"), // Can be empty
      };

      // Send data to the API
      fetch("/api/report/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken, // <-- FIX: Add CSRF token
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Server responded with an error.");
          }
          return response.json();
        })
        .then((result) => {
          // Success!
          console.log("Success:", result);
          if (formStatus) {
            formStatus.textContent =
              "Report submitted successfully. Thank you for your courage.";
            formStatus.classList.add("success");
          }
          reportForm.reset(); // Clear the form
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
});
