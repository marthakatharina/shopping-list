document.addEventListener("DOMContentLoaded", () => {
    // Retrieve items from local storage
    const storedItems = localStorage.getItem("shoppingList");
    if (storedItems) {
        const items = JSON.parse(storedItems);
        items.forEach((item) => {
            createNewItem(item);
        });
    }
});

function addToList() {
    let inputValue = document.getElementById("textInput");
    let val = inputValue.value;

    // createNewItem(val);
    // inputValue.value = "";

    if (val.trim() !== "") {
        createNewItem(val);
        inputValue.value = "";
    }
}

function createNewItem(val) {
    let text = document.getElementById("content");
    let newItem = document.createElement("div");
    newItem.textContent = val;
    newItem.className = "item";

    const svg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            
<title/>

<g id="Complete">

<g id="minus">

<line fill="none" stroke="#b7b7b7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="4" x2="20" y1="12" y2="12"/>

</g>

</g>

</svg>`;

    const svgElement = document.createElement("button");
    svgElement.innerHTML = svg;
    svgElement.className = "btn minus-btn";

    text.append(newItem);
    newItem.prepend(svgElement);

    newItem.addEventListener("click", () => {
        newItem.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const items = Array.from(document.getElementById("content").children).map(
        (item) => item.textContent
    );
    localStorage.setItem("shoppingList", JSON.stringify(items));
}

document.getElementById("textInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addToList();
    }
});
