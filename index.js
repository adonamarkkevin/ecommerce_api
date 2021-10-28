const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

// connect to database
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })
	.then(() => {
		if (process.env.NODE_ENV !== "test") {
			console.log("Server connected to MongoDB ... \n");
			console.log("Press CTRL + C to stop the process. \n");
		}
	})
	.catch((err) => {
		console.error("Server starting error:", err.message);
		process.exit(1);
	});

// Parser
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }, { limit: "50mb" }));

// Routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
