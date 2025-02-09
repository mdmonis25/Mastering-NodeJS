const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const PORT = 8000;

//Middleware - plugins in express
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("Middle Ware 1");
  next();
});
app.use((req, res, next) => {
  console.log("Middle Ware 2");
  // return res.status(786).json({mid:"middleware"})
  next();
});

//Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => ` <li>${user.first_name}</li>`).join("--------")}    
    </ul>    
    `;
  res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Monis");
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  let newId = users[users.length - 1].id + 1;
  users.push({ id: newId, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.send(`User with id = ${newId} added`);
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.send(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    if (!users.find((item) => item.id === id))
      return res.send(`User with id = ${id} not found`);
    let user = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
      return res.send(`User with id = ${id} deleted`);
    });
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
