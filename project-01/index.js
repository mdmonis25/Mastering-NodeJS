const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const PORT = 8000;

//Middleware - plugins in express
app.use(express.urlencoded({ extended: false }));

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
  return res.json(users);
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
  .post((req, res) => {
    const body = req.body;
    users.push({id:users.length+1,...body})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
      return res.send(`User with id = ${users.length} added`);
    })
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    fs.unlink("./MOCK_DATA.json",JSON.stringify(users),())
    return res.json({ status: "pending" });
  });


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
