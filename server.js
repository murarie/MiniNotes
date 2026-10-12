const express = require("express");

const app =express();
const PORT = 3000;

app.use(express.json());

app.get("/", function (req, res) {
    res.send("Mini Notes Backend is working!");
});

app.get("/notes", function (req, res) {
    const notes = [
        { id: 1, content: "Learn full stack" },
        { id: 2, content: "Practice JavaScript" }
    ];

    res.json(notes);
});

app.post("/notes", function (req, res) {
    const note = req.body;

    res.json({
        message: "Note received successfully",
        note: note
    });
});

app.listen(PORT, function (){
    console.log(`server is runninng on port ${PORT}`);

});