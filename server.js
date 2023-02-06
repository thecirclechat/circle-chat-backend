const { sequelize } = require("./server/models/index");

const app = require("./server/app");

const { PORT = 3000 } = process.env;

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
