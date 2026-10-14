const input = document.querySelector("input");
const addButton = document.querySelector("button");
const notesList = document.getElementById("notesList");

async function loadNotes() {
    try {
        const response = await fetch("/notes");

        if (!response.ok) {
            throw new Error("Failed to load notes");
        }

        const notes = await response.json();
        notesList.innerHTML = "";
        document.getElementById("noteCount").textContent =
    `Total notes: ${notes.length}`;

        notes.forEach(function (note) {
            displayNote(note);
        });
    } catch (error) {
        console.error("Error loading notes:", error);
        alert("Could not load notes. Please try again.");
    }
}

function displayNote(note) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    span.textContent = note.content;
    deleteButton.textContent = "Delete";

   deleteButton.addEventListener("click", async function () {
    try {
        const response = await fetch(`/notes/${note.id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete note");
        }

        await loadNotes();
    } catch (error) {
        console.error("Error deleting note:", error);
        alert("Could not delete note. Please try again.");
    }
});

    li.appendChild(span);
    li.appendChild(deleteButton);
    notesList.appendChild(li);
}

addButton.addEventListener("click", async function () {
    const content = input.value.trim();

    if (!content) {
        alert("Please enter a note.");
        return;
    }

    try {
        const response = await fetch("/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: content })
        });

        if (!response.ok) {
            throw new Error("Failed to save note");
        }

        input.value = "";
        await loadNotes();
    } catch (error) {
        console.error("Error saving note:", error);
        alert("Could not save note. Please try again.");
    }
});

loadNotes();