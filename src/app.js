const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/fonico/api/v1", require("./routes"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({ err: err.message });
});

module.exports = app;
