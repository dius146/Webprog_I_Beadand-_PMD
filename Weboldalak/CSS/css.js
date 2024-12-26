document.addEventListener("DOMContentLoaded", function () {
    // HTML elemek beállítása
    const teglalap = document.getElementById("box");
    const eltolV = document.getElementById("translateX");
    const eltolF = document.getElementById("translateY");
    const forgatas = document.getElementById("rotate");
    const meretezes = document.getElementById("scale");
    const ferdites = document.getElementById("skew");
    const torlesGomb = document.getElementById("reset");

    // Transzformáció frissítése
    function frissit() {
        teglalap.style.transform = `
            translate(${eltolV.value}px, ${eltolF.value}px)
            rotate(${forgatas.value}deg)
            scale(${meretezes.value})
            skew(${ferdites.value}deg)`;
    }

    // Eseményfigyelők (változás esetén frissít)
    [eltolV, eltolF, forgatas, meretezes, ferdites].forEach((elem) => {
        elem.addEventListener("input", frissit);
    });

    // Transzformációk törlése alapállapotra
    torlesGomb.addEventListener("click", function () {
        eltolV.value = 0;
        eltolF.value = 0;
        forgatas.value = 0;
        meretezes.value = 1; 
        ferdites.value = 0;
        frissit();
    });
});
