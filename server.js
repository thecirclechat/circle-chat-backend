const express = require("express");
const app = express();
// const app = require("./server/app");
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./server/models/index");

app.use(express.static("public"));

const init = async () => {
  try {
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

init();