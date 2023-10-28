const express = require("express");
const { NotFound, errHandler } = require("./utils/errorHandler");
const { appRouters } = require("./router/index.routes");
const { default: mongoose } = require("mongoose");
const PORTNO = 3000;

mongoose.connect("mongodb://localhost:27017/Authorization", {}).then(() => {
  console.log("db connected");
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appRouters);
app.use(NotFound);
app.use(errHandler);

app.listen(PORTNO || 3000, () => {
  console.log(`app run on port http://localhost:${PORTNO || 3000}`);
});
