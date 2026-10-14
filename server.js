const express = require("express");
const db = require("./db");

const app =express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
app.use(express.json());


app.get("/notes", function (req, res) {
    db.query("SELECT * FROM notes ORDER BY id DESC", function (err, results) {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch notes" });
        }

        res.json(results);
    });
});

app.post("/notes", function (req, res) {
    const content = req.body.content;

    if (!content || !content.trim()) {
        return res.status(400).json({ error: "Note content is required" });
    }

    db.query(
        "INSERT INTO notes (content) VALUES (?)",
        [content.trim()],
        function (err, result) {
            if (err) {
                return res.status(500).json({ error: "Failed to save note" });
            }

            res.status(201).json({
                message: "Note saved successfully",
                id: result.insertId,
                content: content.trim()
            });
        }
    );
});

app.delete("/notes/:id", function (req, res) {
    const id = req.params.id;

    db.query(
        "DELETE FROM notes WHERE id = ?",
        [id],
        function (err, result) {
            if (err) {
                return res.status(500).json({ error: "Failed to delete note" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Note not found" });
            }

            res.json({ message: "Note deleted successfully" });
        }
    );
});

app.listen(PORT, function (){
    console.log(`server is runninng on port ${PORT}`);

});