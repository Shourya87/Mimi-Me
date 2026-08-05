const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const ConnectDB = require("./src/config/database");

app.get("/", (req, res) => {
  res.send("Backend Working 🛰️");
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await ConnectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
