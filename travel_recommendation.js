let travelData;

function fetchRecommendations() {
  fetch('travel_recommendation_api.json')
    .then(res => res.json())
    .then(data => {
      travelData = data;
    })
    .catch(err => console.error("Failed to load data", err));
}

function handleSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("searchResults");
  resultDiv.innerHTML = ""; // Clear previous results

  if (!travelData) {
    resultDiv.innerHTML = "<p>Data not yet loaded.</p>";
    return;
  }

  // Match for beaches
  if (input.includes("beach")) {
    travelData.beaches.forEach(beach => {
      resultDiv.innerHTML += generateCard(beach);
    });
  }

  // Match for temples
  else if (input.includes("temple")) {
    travelData.temples.forEach(temple => {
      resultDiv.innerHTML += generateCard(temple);
    });
  }

  // Match for country names
  else {
    let matchFound = false;
    travelData.countries.forEach(country => {
      if (input.includes(country.name.toLowerCase())) {
        country.cities.forEach(city => {
          resultDiv.innerHTML += generateCard(city);
        });
        matchFound = true;
      }
    });
    if (!matchFound) {
      resultDiv.innerHTML = "<p>No matches found.</p>";
    }
  }
}

function generateCard(item) {
  return `
    <div class="card">
      <h3>${item.name}</h3>
      <img src="${item.imageUrl}" alt="${item.name}">
      <p>${item.description}</p>
    </div>
  `;
}

function resetSearch() {
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // Clear results
    document.getElementById("searchInput").value = ""; // Clear search field
}

window.onload = fetchRecommendations;