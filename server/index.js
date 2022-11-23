const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const profiles = require("././routes/profiles");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 3380;

app.listen(port, () => {
  console.log(`Server up on ${port}!`);
});
