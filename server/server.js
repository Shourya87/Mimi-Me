const dotenv = require('dotenv');
const app = require("./src/app");
const ConnectDB = require("./src/config/database");
dotenv.config();


ConnectDB();


app.get("/", (req, res) => {
    res.send("Backnend Working 🛰️");
});

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend Connected Successfully"
    })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});