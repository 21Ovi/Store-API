require("dotenv").config({ path: "./.env" });

const express = require("express");

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddlewalre = require("./middleware/not-found");
const errorMiddlewalre = require("./middleware/error-handler");
// async errors

const app = express();

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>');
});

app.use("/api/v1/products", productsRouter);

// product routes

app.use(notFoundMiddlewalre);
app.use(errorMiddlewalre);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
