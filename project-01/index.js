const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
