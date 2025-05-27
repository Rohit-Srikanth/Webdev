const express = require("express");
const cors = require("cors");
const path = require("path");

const dbConfig = require("./config/db.config");
const db = require("./models");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("../client/dist"));
app.get("*", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=604800");
  res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
