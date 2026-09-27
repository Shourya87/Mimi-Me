const dns = require("dns");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const ConnectDB = require("./src/config/database");

app.get("/", (req, res) => {
  res.send("Backend Working 🛰️");
});


dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await ConnectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
