// HTML elemek lekérése
const ujTeendoInput = document.getElementById("ujTeendo");
const hozzaadasGomb = document.getElementById("hozzaadasGomb");
const teendoLista = document.getElementById("teendoLista");
const osszefoglalo = document.getElementById("osszefoglalo");

// Teendők tömbje
let teendok = [];

// Teendő hozzáadása
function hozzaadas() {
    const ujTeendoSzoveg = ujTeendoInput.value.trim();

    if (ujTeendoSzoveg === "") {
        alert("A teendő szövege nem lehet üres!");
        return;
    }

    const ujTeendo = {
        id: Date.now(),
        szoveg: ujTeendoSzoveg,
        kesz: false
    };

    teendok.push(ujTeendo);
    ujTeendoInput.value = "";
    listaFrissites();
}

// Teendők listájának frissítése
function listaFrissites() {
    teendoLista.innerHTML = "";

    teendok.forEach((teendo) => {
        const kartya = document.createElement("div");
        kartya.className = `teendoKartya ${teendo.kesz ? "kesz" : ""}`;

        kartya.innerHTML = `
            <span class="teendoSzoveg">${teendo.szoveg}</span>
            <div class="teendoGombok">
                ${teendo.kesz ? "" : `<span class="icon torles">❌</span>`}
                <span class="icon pipalas">✔️</span>
            </div>`;

        // Eseményfigyelők
        const torlesGomb = kartya.querySelector(".torles");
        const pipalasGomb = kartya.querySelector(".pipalas");

        if (torlesGomb) {
            torlesGomb.addEventListener("click", () => teendoTorles(teendo.id));
        }

        pipalasGomb.addEventListener("click", () => teendoPipalas(teendo.id));

        teendoLista.appendChild(kartya);
    });

    // Összegzés frissítése
    const befejezetlenTeendok = teendok.filter((t) => !t.kesz).length;
    osszefoglalo.textContent = `Jelenleg ${befejezetlenTeendok} db befejezetlen teendő van.`;
}

// Teendő törlése
function teendoTorles(id) {
    teendok = teendok.filter((teendo) => teendo.id !== id);
    listaFrissites();
}

// Teendő kipipálása (késznek jelölése)
function teendoPipalas(id) {
    teendok = teendok.map((teendo) => {
        if (teendo.id === id) {
            return { ...teendo, kesz: !teendo.kesz };
        }
        return teendo;
    });
    listaFrissites();
}

// Eseményfigyelő a hozzáadáshoz
hozzaadasGomb.addEventListener("click", hozzaadas);

// Enter billentyűre is lehessen hozzáadni
ujTeendoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        hozzaadas();
    }
});
