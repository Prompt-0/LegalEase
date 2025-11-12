document.addEventListener("DOMContentLoaded", () => {
  let legalActs = [];

  const resultsList = document.getElementById("results-list");
  const loading = document.getElementById("loading");
  const tabContents = document.getElementById("tab-contents");
  const searchInput = document.getElementById("legal-search");
  const searchBtn = document.getElementById("search-btn");
  const quickReferenceGrid = document.getElementById("quick-reference-grid");
  const searchResults = document.getElementById("search-results");
  const resultsCount = document.getElementById("results-count");
  const clearSearchBtn = document.getElementById("clear-search");

  // Hide elements that are no longer used by this simplified version
  if (quickReferenceGrid) quickReferenceGrid.style.display = "none";
  if (document.getElementById("acts-tabs"))
    document.getElementById("acts-tabs").style.display = "none";

  init();

  async function init() {
    try {
      loading.classList.remove("hidden");
      await loadLegalData();
      renderActs(legalActs);
      setupEventListeners();
      loading.classList.add("hidden");
    } catch (error) {
      console.error("Error initializing legal books:", error);
      loading.innerHTML =
        '<div class="error">Error loading legal acts data. Please try again later.</div>';
    }
  }

  // --- FIX: Load from the correct API endpoint ---
  async function loadLegalData() {
    try {
      const response = await fetch("/api/legalacts/");
      if (!response.ok) throw new Error("Failed to load legal acts data");
      legalActs = await response.json();
    } catch (error) {
      console.error("Error loading legal data:", error);
      throw error;
    }
  }

  function setupEventListeners() {
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
    clearSearchBtn.addEventListener("click", clearSearch);
  }

  // --- FIX: Simplified render function ---
  function renderActs(acts) {
    if (!tabContents) return;
    tabContents.innerHTML = ""; // Clear old tab content

    if (acts.length === 0) {
      tabContents.innerHTML = "<p>No legal acts found in the database.</p>";
      return;
    }

    // Create a single list instead of tabs/chapters
    const actsList = document.createElement("div");
    actsList.className = "chapters-list";

    acts.forEach((act) => {
      const actCard = document.createElement("div");
      actCard.className = "chapter-card"; // Re-using existing style
      actCard.innerHTML = `
        <div class="chapter-header">
            <h3>${act.name}</h3>
        </div>
        <div class="chapter-content show"> <div class="section-item">
                <p><strong>Category:</strong> ${act.category || "N/A"}</p>
                <p><strong>Description:</strong> ${act.description}</p>
            </div>
        </div>
      `;
      actsList.appendChild(actCard);
    });

    tabContents.appendChild(actsList);
  }

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      clearSearch();
      return;
    }

    const filteredActs = legalActs.filter(
      (act) =>
        act.name.toLowerCase().includes(query) ||
        act.description.toLowerCase().includes(query) ||
        act.category.toLowerCase().includes(query),
    );

    displaySearchResults(filteredActs, query);
  }

  function displaySearchResults(results, query) {
    if (results.length === 0) {
      searchResults.classList.remove("hidden");
      resultsCount.textContent = "Search Results (0 found)";
      resultsList.innerHTML = "<p>No acts match your search.</p>";
      tabContents.style.display = "none"; // Hide main list
      return;
    }

    resultsCount.textContent = `Search Results (${results.length} found)`;
    resultsList.innerHTML = "";

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    results.forEach((act) => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";

      const highlightedName = act.name.replace(regex, "<mark>$1</mark>");
      const highlightedDesc = act.description.replace(regex, "<mark>$1</mark>");

      resultItem.innerHTML = `
            <div class="result-header">
                <span class="result-act">${highlightedName}</span>
            </div>
            <div class="result-section">
                <p class="result-content">${highlightedDesc}</p>
                <p class="result-keywords"><strong>Category:</strong> ${act.category}</p>
            </div>
        `;
      resultsList.appendChild(resultItem);
    });

    searchResults.classList.remove("hidden");
    tabContents.style.display = "none"; // Hide main list
  }

  function clearSearch() {
    searchInput.value = "";
    searchResults.classList.add("hidden");
    resultsList.innerHTML = "";
    tabContents.style.display = "block"; // Show main list again
    renderActs(legalActs); // Re-render all acts
  }
});
