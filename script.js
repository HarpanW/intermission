let manifest = {};

fetch("data/manifest.json")
    .then(res => res.json())
    .then(data => {
        manifest = data;
        populateDestinations();
    })
    .catch(err => console.error("Error loading manifest:", err));

function populateDestinations() {
    const destSelect = document.getElementById("destSelect");
    destSelect.innerHTML = `<option value="">-- Select destination --</option>`;

    Object.keys(manifest).forEach(dest => {
        const opt = document.createElement("option");
        opt.value = dest;
        opt.textContent = dest;
        destSelect.appendChild(opt);
    });

    destSelect.addEventListener("change", handleDestinationChange);
}

function handleDestinationChange(e) {
    const dest = e.target.value;
    const fromSelect = document.getElementById("fromSelect");
    fromSelect.innerHTML = "";
    fromSelect.disabled = !dest;

    if (!dest) return;

    const fromTracks = manifest[dest];

    fromTracks.forEach(track => {
        const opt = document.createElement("option");
        opt.value = track;
        opt.textContent = track;
        fromSelect.appendChild(opt);
    });

    // Set the first option as selected by default
    fromSelect.value = fromTracks[0];
    updateImage(dest, fromTracks[0]);

    // Remove any old event listeners by replacing the element (simplest approach)
    const newFromSelect = fromSelect.cloneNode(true);
    fromSelect.parentNode.replaceChild(newFromSelect, fromSelect);

    newFromSelect.addEventListener("change", () => {
        const from = newFromSelect.value;
        updateImage(dest, from);
    });
}


function updateImage(dest, from) {
    const img = document.getElementById("mapImage");
    img.src = `images/${encodeURIComponent(dest)}/${encodeURIComponent(from)}.png`;
    img.alt = `${from} → ${dest}`;
}
