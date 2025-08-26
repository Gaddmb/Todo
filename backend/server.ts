import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// cors me permet d'autoriser les requêtes provenant de mon frontend
app.use(cors({ origin: "http://localhost:5173" })); 


app.use(express.json());
app.use("/api", taskRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
