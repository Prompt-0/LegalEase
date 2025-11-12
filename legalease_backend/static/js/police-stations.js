let allPoliceStations = [];
let randomSample = []; // store current sample so we can reuse it on empty searches

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "");
}

function renderStations(stations) {
  const stationsGrid = document.getElementById("stations-grid");
  const stationsResults = document.getElementById("stations-results");
  const stationsCount = document.getElementById("stations-count");
  stationsGrid.innerHTML = "";

  stationsCount.textContent = `Police Stations (${stations.length} shown)`;

  if (stations.length === 0) {
    stationsResults.classList.remove("hidden");
    return;
  }

  stations.forEach((station) => {
    const card = document.createElement("div");
    card.classList.add("station-card");
    card.innerHTML = `
        <h3>${station.name}</h3>
        <p><strong>Address:</strong> ${station.address}</p>
        <p><strong>Pincode:</strong> ${station.pincode}</p>
        <p><strong>District:</strong> ${station.district}</p>
        <p><strong>Phones:</strong> ${
          station.phones.length > 0
            ? station.phones
                .map((ph) => `<a href="tel:${ph}">${ph}</a>`)
                .join(", ")
            : "N/A"
        }</p>
        `;
    stationsGrid.appendChild(card);
  });

  stationsResults.classList.remove("hidden");
}

// In js/police-stations.js

function findStations() {
  const input = document.getElementById("location").value.trim();
  if (!input) {
    // No input? Show the initial random sample again
    renderStations(randomSample);
    return;
  }
  const inputNorm = normalize(input);

  // THIS IS THE CORRECTED LINE (as part of the whole function)
  const matches = allPoliceStations.filter((station) => {
    return (
      normalize(station.address).includes(inputNorm) ||
      normalize(station.district).includes(inputNorm) ||
      normalize(station.pincode).includes(inputNorm)
    );
  });

  renderStations(matches);
}

function useCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      alert(
        `Your location is:\nLatitude: ${latitude}\nLongitude: ${longitude}\n(Reverse geocoding not implemented in this demo)`,
      );
    },
    () => alert("Unable to retrieve your location."),
  );
}

const findStationsBtn = document.getElementById("find-stations-btn");
if (findStationsBtn) findStationsBtn.addEventListener("click", findStations);

const currentLocationBtn = document.getElementById("current-location-btn");
if (currentLocationBtn)
  currentLocationBtn.addEventListener("click", useCurrentLocation);

// ✅ Fetch JSON details from the new API
fetch("/api/policestations/")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to load police stations data.");
    return response.json();
  })
  .then((data) => {
    allPoliceStations = data; // <-- FIX 1: The API returns the list directly
    console.log(`Loaded ${allPoliceStations.length} police stations.`); // <-- FIX 2: Use .length on the list

    // Choose a random sample of 10-15 stations
    const shuffled = allPoliceStations // <-- FIX 3: Use the new variable
      .map((value) => ({ value, sort: Math.random() })) // decorate with random sort keys
      .sort((a, b) => a.sort - b.sort) // sort randomly
      .map(({ value }) => value); // undecorate

    const randomCount = 20;
    randomSample = shuffled.slice(0, randomCount);

    renderStations(randomSample); // Show random sample immediately
  })
  .catch((err) => {
    console.error("Error fetching police stations data:", err); // More specific error
    alert("Could not load police stations data. Please try again later.");
  });
