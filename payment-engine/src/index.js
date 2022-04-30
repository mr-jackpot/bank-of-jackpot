const express = require("express");
const app = express();
const port = 3100;
const router = require("./router/router")
const cors = require("cors")

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use('/', router)

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
