// Reference DOM elements
const searchInput = document.getElementById("case-search");
const categorySelect = document.getElementById("case-category");
const searchBtn = document.getElementById("search-cases-btn");
const resultsSection = document.getElementById("cases-results"); // Changed from cases-results
const noResultsSection = document.getElementById("no-cases-found"); // Changed from no-cases-found
const casesList = document.getElementById("cases-list");
const casesCount = document.getElementById("cases-count");
const resultsSummary = document.getElementById("results-summary");

let allCases = []; // Will hold fetched case data
let allActs = []; // Will hold fetched act data

// Function to fetch all data from APIs
function loadAllData() {
  const casesPromise = fetch("/api/legalcases/").then((res) => res.json()); // <-- FIX
  const actsPromise = fetch("/api/legalacts/").then((res) => res.json()); // <-- FIX

  Promise.all([casesPromise, actsPromise])
    .then(([cases, acts]) => {
      allCases = cases;
      allActs = acts;
      console.log(
        `Loaded ${allCases.length} cases and ${allActs.length} acts.`,
      );

      // Populate categories
      const categories = [...new Set(cases.map((c) => c.category))];
      categories.forEach((category) => {
        if (category) {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        }
      });

      // Initially render all cases
      renderResults(allCases);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      noResultsSection.classList.remove("hidden");
      noResultsSection.querySelector("h3").textContent =
        "Failed to load legal data";
      noResultsSection.querySelector("p").textContent =
        "Please try again later.";
    });
}

// Render results
function renderResults(cases) {
  casesList.innerHTML = ""; // clear previous

  if (cases.length > 0) {
    resultsSection.classList.remove("hidden");
    resultsSummary.style.display = "block";
    noResultsSection.style.display = "none";
    casesCount.textContent = `${cases.length} Similar Cases Found`;
  } else {
    resultsSection.classList.add("hidden");
    resultsSummary.style.display = "none";
    noResultsSection.style.display = "block";
    return;
  }

  cases.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "case-card"); // Using styles from styles.css
    card.innerHTML = `
      <div class="card-body">
        <h3 class="case-title">${item.title}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Summary:</strong> ${item.summary}</p>
        <p><strong>Related Acts:</strong> ${
          item.related_acts.length > 0 ? item.related_acts.join(", ") : "N/A"
        }</p>
      </div>
    `;
    casesList.appendChild(card);
  });
}

// Perform search/filter
function searchCases() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = allCases.filter((item) => {
    const matchesQuery =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);

    const matchesCategory = category === "all" || item.category === category;

    return matchesQuery && matchesCategory;
  });

  renderResults(filtered);
}

// Event listeners
if (searchBtn) searchBtn.addEventListener("click", searchCases);

// Load data on page load
loadAllData();
