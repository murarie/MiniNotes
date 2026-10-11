const noteInput = document.querySelector("input");
const addButton = document.querySelector("button");
const notesList = document.getElementById("notesList");

addButton.addEventListener("click", function () {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        return;
    }

    const li = document.createElement("li");
const noteSpan = document.createElement("span");
noteSpan.textContent = noteText;

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";

deleteButton.addEventListener("click", function () {
    li.remove();
});

li.appendChild(noteSpan);
li.appendChild(deleteButton);
    notesList.appendChild(li);
    noteInput.value = "";
});