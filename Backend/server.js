const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
