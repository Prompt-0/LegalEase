// Reference DOM elements
const searchInput = document.getElementById("case-search");
const categorySelect = document.getElementById("case-category");
const searchBtn = document.getElementById("search-cases-btn");
const resultsSection = document.getElementById("cases-results");
const noResultsSection = document.getElementById("no-cases-found");
const casesList = document.getElementById("cases-list");
const casesCount = document.getElementById("cases-count");

let allCases = []; // Will hold fetched case data
let allActs = []; // Will hold fetched act data

// Function to fetch all data from APIs
function loadAllData() {
  const casesPromise = fetch("/api/legalcases/").then((res) => res.json());
  const actsPromise = fetch("/api/legalacts/").then((res) => res.json());

  Promise.all([casesPromise, actsPromise])
    .then(([cases, acts]) => {
      allCases = cases;
      allActs = acts;
      console.log(
        `Loaded ${allCases.length} cases and ${allActs.length} acts.`,
      );
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
    noResultsSection.classList.add("hidden");
    casesCount.textContent = `Legal Cases (${cases.length} found)`;
  } else {
    resultsSection.classList.add("hidden");
    noResultsSection.classList.remove("hidden");
    return;
  }

  cases.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "case-card");
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
searchBtn.addEventListener("click", searchCases);

// Load data on page load
loadAllData();
