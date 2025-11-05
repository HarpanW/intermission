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

    fromSelect.disabled = false;

    // Automatically select first track
    fromSelect.selectedIndex = 0;
    updateImage(dest, fromSelect.value);

    // Update image when user changes selection
    fromSelect.onchange = () => {
        updateImage(dest, fromSelect.value);
    };
}


function updateImage(dest, from) {
    const img = document.getElementById("mapImage");
    img.src = `images/${encodeURIComponent(dest)}/${encodeURIComponent(from)}.png`;
    img.alt = `${from} → ${dest}`;
    img.style.display = "block"; // Show the image now that a selection was made
}
