// User se related saare routes yahan hai
// /users sab taraf se hata diya gaya hai
const {
  handleGetAllUsers,
  handleGetUserById,
  handleAddNewUser,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controllers/user");
const express = require("express");
const router = express.Router();

// api for users
router.route("/").get(handleGetAllUsers).post(handleAddNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
