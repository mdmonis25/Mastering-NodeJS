const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");

const PORT = 8000;

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


app.route("/api/users/:id").get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.send(user);
  }).patch((req,res)=>{
    return res.json({status: "pending"})
  }).post((req,res)=>{
    return res.json({status: "pending"})
  }).delete((req,res)=>{
    return res.json({status: "pending"})
  })
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   res.send(user);
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
