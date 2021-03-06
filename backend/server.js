import express from "express"
import path from "path"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import emailRoute from "./routes/emailRoute.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

//that is to allow us to accept json data in the body in postman
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/send", emailRoute)



const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")))
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")))
} else {
    app.get("/", (req, res) => {
        res.send("API is running....")
    })
}

// custom error handling by middleware which is a function that can access to requests and response cycle
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} ^_^`)
)