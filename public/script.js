const input = document.querySelector("input");
const addButton = document.querySelector("button");
const notesList = document.getElementById("notesList");

async function loadNotes() {
    const response = await fetch("/notes");
    const notes = await response.json();

    notesList.innerHTML = "";

    notes.forEach(function (note) {
        displayNote(note);
    });
}

function displayNote(note) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    span.textContent = note.content;
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async function () {
    const response = await fetch(`/notes/${note.id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        li.remove();
    } else {
        alert("Failed to delete note");
    }
});

    li.appendChild(span);
    li.appendChild(deleteButton);
    notesList.appendChild(li);
}

addButton.addEventListener("click", async function () {
    const content = input.value.trim();

    if (!content) return;

    const response = await fetch("/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: content })
    });

    if (response.ok) {
        input.value = "";
        loadNotes();
    } else {
        alert("Failed to save note");
    }
});

loadNotes();