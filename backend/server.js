const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all oricins

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/"+ r)));

// Database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to Mongoose Database : ", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}..`);
});


