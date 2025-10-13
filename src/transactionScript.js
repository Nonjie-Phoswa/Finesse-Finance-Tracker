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
  // const addAccountBtn = document.getElementById("add-account-btn");
  // const addTransactionBtn = document.getElementById("add-transaction-btn");
  // const viewInvestmentsBtn = document.getElementById("view-investments-btn");

  // addAccountBtn.addEventListener("click", () => {
  //   alert("Add Account feature would open here!");
  // });

  // addTransactionBtn.addEventListener("click", () => {
  //   alert("Add Transaction feature would open here!");
  // });

  // viewInvestmentsBtn.addEventListener("click", () => {
  //   alert("View All Investments feature would open here!");
  // });

  // Header icon buttons (placeholder functionality)
  const headerButtons = ["profile-btn", "notifications-btn", "settings-btn"];

  headerButtons.forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", () => {
      // In a real app, these would open profile menus, notifications, or settings
      alert(`"${buttonId.replace("-btn", "")}" feature would open here!`);
    });
  });
}

// Modal Elements
const addAccountModal = document.getElementById("add-account-modal");
const addTransactionModal = document.getElementById("add-transaction-modal");
const viewMoreModal = document.getElementById("view-more-modal");

// Open Modal Functions
function openAddAccountModal() {
  addAccountModal.style.display = "flex";
  document.body.style.overflow = "hidden"; 
}

function openAddTransactionModal() {
  addTransactionModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Set default date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("transaction-date").value = today;
}

function openViewMoreModal() {
  viewMoreModal.style.display = "flex";
  document.body.style.overflow = "hidden"; 
}

// Close Modal Functions
function closeAddAccountModal() {
  addAccountModal.style.display = "none";
  document.body.style.overflow = "auto"; 
  document.getElementById("add-account-form").reset();
}

function closeAddTransactionModal() {
  addTransactionModal.style.display = "none";
  document.body.style.overflow = "auto"; 
  document.getElementById("add-transaction-form").reset();
}

function closeViewMoreModal() {
  viewMoreModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside content
function setupOutsideClickClose(modal, closeFunction) {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeFunction();
    }
  });
}

// Close modal with Escape key
function setupEscapeKeyClose(closeFunction) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeFunction();
    }
  });
}

// Form Submission Handlers
function handleAddAccountForm(event) {
  event.preventDefault();

  // Get form values
  const accountName = document.getElementById("account-name").value;
  const accountType = document.getElementById("account-type").value;
  const initialBalance = document.getElementById("initial-balance").value;

  // In a real app, you would send this data to your backend
  console.log("Adding account:", {
    name: accountName,
    type: accountType,
    balance: initialBalance,
  });

  // Show success message
  alert(`Account "${accountName}" added successfully!`);

  // Close modal
  closeAddAccountModal();
}

function handleAddTransactionForm(event) {
  event.preventDefault();

  // Get form values
  const transactionType = document.getElementById("transaction-type").value;
  const description = document.getElementById("transaction-description").value;
  const amount = document.getElementById("transaction-amount").value;
  const date = document.getElementById("transaction-date").value;
  const category = document.getElementById("transaction-category").value;
  const account = document.getElementById("transaction-account").value;

  // In a real app, you would send this data to your backend
  console.log("Adding transaction:", {
    type: transactionType,
    description: description,
    amount: amount,
    date: date,
    category: category,
    account: account,
  });

  // Show success message
  alert(`Transaction "${description}" added successfully!`);

  // Close modal
  closeAddTransactionModal();
}

// Initialize Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Open modal buttons
  document
    .getElementById("add-account-btn")
    .addEventListener("click", openAddAccountModal);
  document
    .getElementById("add-transaction-btn")
    .addEventListener("click", openAddTransactionModal);
  document
    .getElementById("open-view-more")
    .addEventListener("click", openViewMoreModal);

  // Close modal buttons
  document
    .getElementById("close-add-account")
    .addEventListener("click", closeAddAccountModal);
  document
    .getElementById("cancel-add-account")
    .addEventListener("click", closeAddAccountModal);

  document
    .getElementById("close-add-transaction")
    .addEventListener("click", closeAddTransactionModal);
  document
    .getElementById("cancel-add-transaction")
    .addEventListener("click", closeAddTransactionModal);

  document
    .getElementById("close-view-more")
    .addEventListener("click", closeViewMoreModal);
  document
    .getElementById("close-view-more-btn")
    .addEventListener("click", closeViewMoreModal);

  // Form submissions
  document
    .getElementById("add-account-form")
    .addEventListener("submit", handleAddAccountForm);
  document
    .getElementById("add-transaction-form")
    .addEventListener("submit", handleAddTransactionForm);

  // Close modals when clicking outside
  setupOutsideClickClose(addAccountModal, closeAddAccountModal);
  setupOutsideClickClose(addTransactionModal, closeAddTransactionModal);
  setupOutsideClickClose(viewMoreModal, closeViewMoreModal);

  // Close modals with Escape key
  setupEscapeKeyClose(closeAddAccountModal);
  setupEscapeKeyClose(closeAddTransactionModal);
  setupEscapeKeyClose(closeViewMoreModal);
});
