// Set current month
// document.addEventListener("DOMContentLoaded", function () {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const now = new Date();
//   const currentMonth = months[now.getMonth()];
//   const currentYear = now.getFullYear();
//   document.getElementById(
//     "current-month"
//   ).textContent = `${currentMonth} ${currentYear}`;

//   // Set up event listeners
//   setupEventListeners();
// });

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

  // Set up event listeners
  setupEventListeners();
});

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

  // Filter functionality
  const accountFilter = document.getElementById("account-filter");
  const typeFilter = document.getElementById("type-filter");
  const transactionItems = document.querySelectorAll(".transaction-item");

  function filterTransactions() {
    const accountValue = accountFilter.value;
    const typeValue = typeFilter.value;

    transactionItems.forEach((item) => {
      let showItem = true;

      // Filter by account
      if (accountValue !== "all") {
        const accountElement = item.querySelector(".transaction-account");
        if (accountElement) {
          const accountText = accountElement.textContent.toLowerCase();
          if (accountValue === "capitec" && !accountText.includes("capitec")) {
            showItem = false;
          } else if (accountValue === "fnb" && !accountText.includes("fnb")) {
            showItem = false;
          } else if (accountValue === "cash" && !accountText.includes("cash")) {
            showItem = false;
          }
        }
      }

      // Filter by type
      if (typeValue !== "all") {
        const amountElement = item.querySelector(".transaction-amount");
        if (amountElement) {
          const amountText = amountElement.textContent;
          if (typeValue === "income" && !amountText.startsWith("+")) {
            showItem = false;
          } else if (typeValue === "expense" && !amountText.startsWith("-")) {
            showItem = false;
          }
        }
      }

      // Show or hide item
      item.style.display = showItem ? "flex" : "none";
    });
  }

  accountFilter.addEventListener("change", filterTransactions);
  typeFilter.addEventListener("change", filterTransactions);

  // Button functionality
  const addAccountBtn = document.getElementById("add-account-btn");
  const addTransactionBtn = document.getElementById("add-transaction-btn");
  const viewInvestmentsBtn = document.getElementById("view-investments-btn");

  addAccountBtn.addEventListener("click", () => {
    alert("Add Account feature would open here!");
  });

  addTransactionBtn.addEventListener("click", () => {
    alert("Add Transaction feature would open here!");
  });

  viewInvestmentsBtn.addEventListener("click", () => {
    alert("View All Investments feature would open here!");
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
