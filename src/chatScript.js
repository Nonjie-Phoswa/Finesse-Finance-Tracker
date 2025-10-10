// Set current month
document.addEventListener("DOMContentLoaded", function () {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  const currentMonth = months[now.getMonth()];
  const currentYear = now.getFullYear();
  document.getElementById(
    "current-month"
  ).textContent = `${currentMonth} ${currentYear}`;

  initializeAIAssistant();

  setupEventListeners();
});


function initializeAIAssistant() {
  // Add sample conversation if empty
  const chatMessages = document.getElementById("chat-messages");
  if (chatMessages.children.length === 0) {
    addMessage(
      "Hi there! I'm Fin, your AI finance assistant. How can I help you today?",
      "ai"
    );
  }
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navContainer = document.getElementById("nav-container");

  mobileMenuToggle.addEventListener("click", () => {
    navContainer.classList.toggle("active");
  });

  // Navigation items
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Remove active class from all items
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });

      // Add active class to clicked item
      e.currentTarget.classList.add("active");

      // Close mobile menu after selection
      if (window.innerWidth <= 768) {
        navContainer.classList.remove("active");
      }
    });
  });

  // FAQ category buttons
  const categoryButtons = document.querySelectorAll(".category-btn");
  const faqQuestions = document.querySelectorAll(".faq-question");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Show/hide questions based on category
      faqQuestions.forEach((question) => {
        if (
          category === "all" ||
          question.getAttribute("data-category") === category
        ) {
          question.style.display = "block";
        } else {
          question.style.display = "none";
        }
      });
    });
  });

  // FAQ question click
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const questionText = question.querySelector("h4").textContent;
      sendMessage(questionText);
    });
  });

  // Template buttons
  const templateButtons = document.querySelectorAll(".template-btn");

  templateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const template = button.getAttribute("data-template");
      let message = "";

      switch (template) {
        case "analyze-spending":
          message =
            "Can you analyze my spending patterns and suggest areas where I can cut back?";
          break;
        case "saving-tips":
          message =
            "What are some practical saving tips for someone with my income?";
          break;
        case "budget-review":
          message =
            "Can you review my current budget and suggest improvements?";
          break;
        case "debt-strategy":
          message = "What's the best strategy to pay off my debt faster?";
          break;
      }

      sendMessage(message);
    });
  });

  // Chat input and send button
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");
  const typingIndicator = document.getElementById("typing-indicator");

  // Send message on button click
  sendButton.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message) {
      sendMessage(message);
      chatInput.value = "";
    }
  });

  // Send message on Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const message = chatInput.value.trim();
      if (message) {
        sendMessage(message);
        chatInput.value = "";
      }
    }
  });

  // Header icon buttons (placeholder functionality)
  const headerButtons = ["profile-btn", "notifications-btn", "settings-btn"];

  headerButtons.forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", () => {
      // In a real app, these would open profile menus, notifications, or settings
      alert(`"${buttonId.replace("-btn", "")}" feature would open here!`);
    });
  });
}

// Send message to AI assistant
function sendMessage(message) {
  // Add user message to chat
  addMessage(message, "user");

  // Show typing indicator
  const typingIndicator = document.getElementById("typing-indicator");
  typingIndicator.style.display = "block";

  // Scroll to bottom
  scrollToBottom();

  // Call Netlify AI function
  fetch(`/.netlify/functions/getChatBotAdvice?message=${encodeURIComponent(message)}`)
    .then((res) => res.json())
    .then((data) => {
      typingIndicator.style.display = "none";

      const aiResponse =
        data.answer || data.output || "Sorry, I couldn’t process that.";

      addMessage(aiResponse, "ai");
      scrollToBottom();
    })
    .catch((error) => {
      typingIndicator.style.display = "none";
      addMessage("⚠️ There was an error connecting to the financial advisor.", "ai");
      console.error(error);
    });
}

// Add message to chat
function addMessage(text, sender) {
  const chatMessages = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(sender === "user" ? "user-message" : "ai-message");
  messageDiv.innerHTML = formatMessage(text);
  chatMessages.appendChild(messageDiv);
}

function formatMessage(text) {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\n/g, "<br>");

  return formatted;
}

// Scroll chat to bottom
function scrollToBottom() {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
