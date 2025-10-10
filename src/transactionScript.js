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
