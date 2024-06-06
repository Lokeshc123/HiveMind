const app = require("./app");
const dotenv = require("dotenv");
const connectDb = require("./config/database");
dotenv.config({ path: "server/config/.env" });

connectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
