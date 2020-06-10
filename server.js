var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.set("views", "./views");

const userModel = require("./models/user");
const postModel = require("./models/post");

const uri =
  "mongodb+srv://itimius94:matkhau123@cluster0-ie86k.gcp.mongodb.net/lux?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  const users = await userModel.find(req.body);

  try {
    if (users.length === 1) {
      res.cookie("user_id", users[0]._id);
      res.send(users[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/logout", (req, res) => {
  try {
    res.send("Logout success!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/register", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

app.post("/me/posts", async (req, res) => {
  const { user_id = "" } = req.cookies;
  const payload = req.body;

  payload.user_id = user_id;
  payload.posted_at = new Date().toString();
  payload.updated_at = new Date().toString();

  const post = new postModel(payload);

  try {
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/me/posts", async (req, res) => {
  const { user_id = "" } = req.cookies;
  const posts = await postModel.find({ user_id });

  try {
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
