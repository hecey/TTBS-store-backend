const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const products = require("./routes/products");
const categories = require("./routes/categories");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Rutas o endpoints
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/products", products);
app.use("/categories", categories);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});