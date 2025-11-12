document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  function addMessage(message, sender) {
    if (!chatMessages) return;
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    // Basic markdown-to-HTML for bot responses
    let htmlMessage = message.replace(/\n/g, "<br>");
    htmlMessage = htmlMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    htmlMessage = htmlMessage.replace(/\*(.*?)\*/g, "<em>$1</em>");
    messageDiv.innerHTML = htmlMessage;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
  }

  function handleSend() {
    if (!chatInput || !chatMessages) return;
    const query = chatInput.value.trim();
    if (query === "") return;

    // 1. Add user's message to chat
    addMessage(query, "user");
    chatInput.value = ""; // Clear input

    // 2. Show a "typing" indicator (optional, but nice)
    addMessage("...", "bot");
    const typingIndicator = chatMessages.lastChild;

    // 3. Send query to the new backend API
    fetch("/api/legalbot/query/", {
      // <-- THIS IS THE FIX
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 4. Replace "..." with the real answer
        if (typingIndicator) typingIndicator.innerHTML = data.answer;
      })
      .catch((error) => {
        console.error("Error:", error);
        if (typingIndicator)
          typingIndicator.innerHTML =
            "Sorry, I had trouble connecting. Please try again.";
      });
  }

  if (sendBtn) sendBtn.addEventListener("click", handleSend);
  if (chatInput)
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleSend();
      }
    });

  // Add initial greeting
  addMessage(
    "Hello! I am Legalease Bot. How can I help you with your legal query today?",
    "bot",
  );
});
