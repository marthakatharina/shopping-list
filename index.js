document.addEventListener("DOMContentLoaded", () => {
    // Retrieve items from local storage
    const storedItems = localStorage.getItem("shoppingList");
    if (storedItems) {
        const items = JSON.parse(storedItems);
        items.forEach((item) => {
            // Handle both old format (string) and new format (object)
            if (typeof item === "string") {
                createNewItem(item, false);
            } else {
                createNewItem(item.text, item.strikethrough);
            }
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

function createNewItem(val, isStrikethrough = false) {
    let text = document.getElementById("content");
    let newItem = document.createElement("div");
    newItem.className = "item";

    const btnElement = document.createElement("button");
    
    // If item is already struck through, show minus button
    if (isStrikethrough) {
        btnElement.className = "btn minus-btn";
        newItem.classList.add("strikethrough");
        
        const minusSvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            
<title/>

<g id="Complete">

<g id="minus">

<line fill="none" stroke="#b7b7b7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="4" x2="20" y1="12" y2="12"/>

</g>

</g>

</svg>`;
        btnElement.innerHTML = minusSvg;
    } else {
        btnElement.className = "btn empty-btn";
        
        // Empty SVG (same structure as minus-btn but without the line)
        const emptySvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            
<title/>

<g id="Complete">

</g>

</svg>`;
        btnElement.innerHTML = emptySvg;
    }

    const textSpan = document.createElement("span");
    textSpan.textContent = val.trim();
    textSpan.className = "item-text";

    text.append(newItem);
    newItem.prepend(btnElement);
    newItem.append(textSpan);

    // Click handler for empty-btn: strikethrough animation
    btnElement.addEventListener("click", (e) => {
        e.stopPropagation();

        if (btnElement.classList.contains("empty-btn")) {
            // Add strikethrough class to trigger animation
            newItem.classList.add("strikethrough");

            // After animation completes, convert to minus-btn
            setTimeout(() => {
                btnElement.classList.remove("empty-btn");
                btnElement.classList.add("minus-btn");

                const svg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            
<title/>

<g id="Complete">

<g id="minus">

<line fill="none" stroke="#b7b7b7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="4" x2="20" y1="12" y2="12"/>

</g>

</g>

</svg>`;
                btnElement.innerHTML = svg;
                updateLocalStorage();
            }, 600); // Match animation duration
        } else if (btnElement.classList.contains("minus-btn")) {
            // Delete item when minus-btn is clicked
            newItem.remove();
            updateLocalStorage();
        }
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const items = Array.from(document.getElementById("content").children).map(
        (item) => ({
            text: item.querySelector(".item-text").textContent,
            strikethrough: item.classList.contains("strikethrough"),
        }),
    );
    localStorage.setItem("shoppingList", JSON.stringify(items));
}

document.getElementById("textInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addToList();
    }
});
