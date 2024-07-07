import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { default as MongoStore } from "connect-mongo";
import { createServer } from "http";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
const server = createServer(app);
dotenv.config();
connectDB();
app.set("trust proxy", 1);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 6000 * 60,
      httpOnly: true,
      secure: true,
      sameSite:'none'
    },
  })
);

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));

//Routes
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);

app.use("/", (req, res) => {
  res.send("HELLOOOO");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server is running on port ${PORT}`));
