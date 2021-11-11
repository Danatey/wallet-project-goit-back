const db = require("../config/db");
const app = require("../app");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`);
});
