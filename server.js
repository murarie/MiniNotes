const express = require("express");
const db = require("./db");

const app =express();
const PORT = 3000;

app.use(express.json());

app.get("/", function (req, res) {
    res.send("Mini Notes Backend is working!");
});

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

app.listen(PORT, function (){
    console.log(`server is runninng on port ${PORT}`);

});