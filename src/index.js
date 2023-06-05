import express from "express";
import dotenv from "dotenv";
const app = express();
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { scheduleBirthdayMessages } from "./utils/index.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
  scheduleBirthdayMessages();
});
