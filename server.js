import { connectDB } from "./config/db.js"
import contactRouter from "./Routes/contactRoutes.js"
import userRouter from "./Routes/userRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import express from "express"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";
import cors from "cors"



dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.use("/api/contacts", contactRouter)
app.use("/api/user", userRouter)
app.use(cors())
const swaggerUiOptions = {
    explorer: true, // keep explorer
    customSiteTitle: "Contact API - Docs", // changes tab title
    customfavIcon: "/myfavicon.ico" // optional favicon
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));


// (optional) Raw JSON of your OpenAPI spec
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("Welcome to the Contact API")
})
connectDB()