const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  res.json(users);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ message: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "user not found" });
    await User.findByIdAndUpdate(req.params.id, { lastName: "Masoodi" });
    return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "user not found" });
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "Deleted" });
}

async function handleAddNewUser(req, res) {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_designation
    )
      return res.status(400).json({ message: "All fields Are Required" });
  
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_designation,
    });
    console.log(result);
    return res.status(201).json({ message: "Success" , id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleAddNewUser
};
