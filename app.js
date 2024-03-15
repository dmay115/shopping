const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const itemRoutes = require("./routes/items");
const { items } = require("./fakeDB");

app.use(express.json());
app.use("/items", itemRoutes);

app.listen(3000, function () {
    console.log("Server starting on port 3000");
});

module.exports = app;
