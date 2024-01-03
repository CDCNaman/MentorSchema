const express = require("express");
const loginRoute = require("./routes/mentor");
const connectDB = require("./database/db");
const app = express();


const PORT = process.env.PORT || 5000

//middlewares
app.use(express.json());
app.use("/api", loginRoute);
connectDB() //! database 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});