let database = require("./database.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable CORS
app.use(cors());

app.get("/", (req, res) => {
  console.log(database.users);
  res.send("This is working!");
});

app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;

  console.log("userId", userId);
  let userFound = {};

  for (let user of database.users) {
    if (userId.toString() === user.id) {
      Object.assign(userFound, user);
      break;
    }
  }

  res.json(userFound);
});

app.post("/signin", (req, res) => {
  const { users } = database;
  const { email, password } = req.body;

  console.log("email", email);
  console.log("password", password);

  let userLogin = users.find(
    (user) => email === user.email && password === user.password
  );

  userLogin ? res.status(200).json(userLogin) : res.json(null);

  // userLogin ? res.status(200).json(userLogin) : res.status(400).json(userLogin);

  // let isValidated = database.users.some(
  //   (user) => email === user.email && password === user.password
  // );

  // isValidated
  //   ? res.json("success")
  //   : res.status(400).json("Email or Password are incorrect!");
});

app.post("/register", (req, res) => {
  let { users } = database;
  const { name, email, password } = req.body;

  console.log("name", name);
  console.log("email", email);
  console.log("password", password);

  users.push({
    id: (++database.currentID).toString(),
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  console.log(users[users.length - 1]);
  res.json(users[users.length - 1]);
});

app.put("/image", (req, res) => {
  const { userId } = req.body;
  let { users } = database;
  let currentUser = {};

  for (let user of users) {
    if (userId === user.id) {
      currentUser = Object.assign(user, { entries: user.entries + 1 });
      break;
    }
  }

  res.json(currentUser);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

/* 
/ --> res = this is working
/signin           --> POST  res: success/fail
/register         --> POST  res: new user object
/profile/:userId  --> GET   res: current user 
/image            --> PUT   res: current user with the updated entries
*/
