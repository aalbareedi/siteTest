import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("../static"));

app.use(express.json());

app.post("/submission", (req, res) => {
    console.log("body: ", req.body);

    // TODO: Put it in the database
    res.status(200).send();
});

app.get("/submission", (req, res) => {
    // TODO: Get all submissions
    res.status(200).send();
});

app.get("/submission/:id", (req, res) => {
    const { id } = req.params;

    // TODO: Get one submission
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
