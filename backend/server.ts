import express from "express";
import taskRoutes from "./routes/taskRoutes"


const app = express()
app.use(express.json())

app.use("/api" , taskRoutes)

const PORT = 3001
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)
)
