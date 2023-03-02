const express = require("express");
const routes = require("./routes/mintdata");
const cors = require("cors");

const app = express();
app.use(cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// Mount the router on the app
app.use("/", routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new Error(404, "Not found"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
