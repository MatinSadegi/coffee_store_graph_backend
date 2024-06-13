import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
const server = createServer(app);
app.use(cookieParser());
dotenv.config();
connectDB();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.static('public'))

//Routes
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);


app.use("/", (req, res) => {
  res.send("HELLOOOO");
});
 
  
const PORT = process.env.PORT || 5000; 
server.listen(PORT, console.log(`server is running on port ${PORT}`));
