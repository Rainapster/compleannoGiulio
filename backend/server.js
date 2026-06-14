import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import participantsRouter from "./routes/partecipant.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/giulio";

console.log("START backend", { PORT, MONGO_URI });

app.use(cors());
app.use(express.json());

app.use("/api/participants", participantsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend Express attivo" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connesso a MongoDB");
    app.listen(PORT, () => {
      console.log(`Server in ascolto su http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Errore di connessione MongoDB:", error);
    process.exit(1);
  });