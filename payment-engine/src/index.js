const express = require("express");
const app = express();
const port = 3100;
const router = require("./router/router")

app.use('/', router)

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});