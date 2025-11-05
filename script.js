let routeData = [];

// Load route data
fetch("data/routes.json")
    .then((res) => res.json())
    .then((data) => {
        routeData = data.routes;
        populateDropdown(routeData);
    })
    .catch((err) => console.error("Error loading routes:", err));

// Populate the dropdown
function populateDropdown(routes) {
    const select = document.getElementById("routeSelect");
    select.innerHTML = "";

    routes.forEach((r, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `${r.name} (${r.direction})`;
        select.appendChild(opt);
    });

    // Set default view
    if (routes.length > 0) updateViewer(0);

    select.addEventListener("change", (e) => {
        updateViewer(e.target.value);
    });
}

// Update image and notes
function updateViewer(index) {
    const img = document.getElementById("mapImage");
    const notes = document.getElementById("notesText");
    const r = routeData[index];

    img.src = r.image;
    notes.textContent = r.notes || "No notes available for this route.";
}

// Add search functionality
document.getElementById("searchBox").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = routeData.filter((r) =>
        r.name.toLowerCase().includes(query)
    );
    populateDropdown(filtered);
});
