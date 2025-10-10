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

  // Animate progress rings
  animateProgressRings();

  // Set up event listeners
  setupEventListeners();
});

// Animate progress rings
function animateProgressRings() {
  // Main progress ring (68.75% used, 31.25% remaining)
  const mainProgress = document.querySelector(".progress-ring-fill");
  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (31.25 / 100) * circumference;

  mainProgress.style.strokeDasharray = `${circumference}`;
  mainProgress.style.strokeDashoffset = `${circumference}`;

  // Trigger animation after a short delay
  setTimeout(() => {
    mainProgress.style.strokeDashoffset = offset;
  }, 300);

  // Category progress rings
  const categories = [
    { element: document.querySelector(".food-fill"), percentage: 75 },
    { element: document.querySelector(".housing-fill"), percentage: 45 },
    { element: document.querySelector(".clothing-fill"), percentage: 30 },
    { element: document.querySelector(".transport-fill"), percentage: 60 },
    { element: document.querySelector(".entertainment-fill"), percentage: 25 },
    { element: document.querySelector(".other-fill"), percentage: 15 },
  ];

  const categoryCircumference = 2 * Math.PI * 27;

  categories.forEach((category, index) => {
    category.element.style.strokeDasharray = `${categoryCircumference}`;
    category.element.style.strokeDashoffset = `${categoryCircumference}`;

    setTimeout(() => {
      const offset =
        categoryCircumference -
        (category.percentage / 100) * categoryCircumference;
      category.element.style.strokeDashoffset = offset;
    }, 500 + index * 150);
  });
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

  // AI Advice button
  const aiAdviceBtn = document.getElementById("ai-advice-btn");
  const aiModal = document.getElementById("ai-modal");
  const closeAiModal = document.getElementById("close-ai-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  aiAdviceBtn.addEventListener("click", () => {
    aiModal.style.display = "flex";
  });

  closeAiModal.addEventListener("click", () => {
    aiModal.style.display = "none";
  });

  closeModalBtn.addEventListener("click", () => {
    aiModal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === aiModal) {
      aiModal.style.display = "none";
    }
  });

  // Quick action buttons (placeholder functionality)
  const quickActionButtons = [
    "add-income-btn",
    "add-expense-btn",
    "view-budgets-btn",
  ];

  quickActionButtons.forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", () => {
      // In a real app, these would navigate to different pages or open modals
      alert(
        `"${buttonId
          .replace("-btn", "")
          .replace(/-/g, " ")}" feature would open here!`
      );
    });
  });

  const askFinButton = document.getElementById("get-advice-btn");

  askFinButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "chatBot.html";
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
