document.addEventListener("DOMContentLoaded", function() {
    loadCats();

    document.querySelector("button").addEventListener("click", filterData);
});

function loadCats(name = "", origin = "") {
    let url = `http://localhost:3000/cats?name=${name}&origin=${origin}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let tbody = document.querySelector("#dataTable tbody");
            tbody.innerHTML = "";
            data.forEach(cat => {
                let row = tbody.insertRow();
                row.insertCell(0).innerText = cat.id;
                row.insertCell(1).innerText = cat.name;
                row.insertCell(2).innerText = cat.origin;
                row.insertCell(3).innerText = cat.length;
                let deleteCell = row.insertCell(4);
                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Törlés";
                deleteButton.classList.add("delete-btn");
                deleteButton.onclick = function() { deleteCat(cat.id); };
                deleteCell.appendChild(deleteButton);
            });
        });
}

function filterData() {
    let nameFilter = document.getElementById("nameFilter").value;
    let originFilter = document.getElementById("originFilter").value;
    loadCats(nameFilter, originFilter);
}

function deleteCat(id) {
    fetch(`http://localhost:3000/cats/${id}`, {
        method: "DELETE",
    })
    .then(() => {
        loadCats();
    });
}
