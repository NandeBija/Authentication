const express = require("express");
const req = require("express/lib/request");
const app = express();
const bcrypt = require("bcrypt"); // bcrypt is used to hash passwords
//  to make sure that passwords are not displayed as their actual values//
app.use(express.json());

const users = [
  //   {
  //     username: "Nandebija",
  //     title: "post 1",
  //   },
  //   {
  //     username: "Emanuel",
  //     title: "post ",
  //   },
  //   {
  //     username: "KG",
  //     title: "post 3",
  //   },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //securing the password with salt and hash //

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// route to login a particular user//

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return RegExp.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(5000);
