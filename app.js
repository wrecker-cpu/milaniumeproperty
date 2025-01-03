const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config(); // Ensure environment variables are loaded

const app = express();
const PORT = process.env.PORT || 4000;

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://milaniume-property.vercel.app"],
    methods: "GET,HEAD,PUT,POST,DELETE",
    credentials: true,
  })
);

// Require Routes
const userRoutes = require("./routes/UserRoutes");
const googleRoutes = require("./routes/GoogleRoutes");
const propertyRoutes = require("./routes/PropertyRoutes");
const enquiryRoutes = require("./routes/EnquiryRoutes");
const requireRoutes = require("./routes/RequireRoutes");

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define API Endpoints with prefixes
app.use("/api/users", userRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/require", requireRoutes);

// DATABASE CONNECTION
const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Connected to MongoDB");
      break; // Exit the loop on successful connection
    } catch (err) {
      console.error("Failed to connect to DB", err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }

  if (retries === 0) {
    console.error("Could not connect to MongoDB after multiple attempts.");
    process.exit(1); // Exit process if connection fails
  }
};

connectDB();

// Server creation
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
