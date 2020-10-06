require("dotenv").config();
const app = require("./app");
require("./database/database");

app.listen(app.get("port"), () => {
  console.log("SERVER ON PORT:", app.get("port"));
});
