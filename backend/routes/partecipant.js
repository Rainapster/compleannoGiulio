import crypto from "crypto";
import express from "express";
import Participant from "../models/Partecipant.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const partecipants = await Participant.find().sort({ createdAt: -1 }).select("-deletionToken");
    res.json(partecipants);
  } catch (error) {
    console.error("Errore nel recupero dei partecipanti:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

router.post("/", async (req, res) => {
  const { name, surname } = req.body;

  if (!name?.trim() || !surname?.trim()) {
    return res.status(400).json({ message: "Nome e cognome sono obbligatori" });
  }

  try {
    const participant = new Participant({
      name: name.trim(),
      surname: surname.trim(),
      deletionToken: crypto.randomBytes(16).toString("hex"),
    });
    await participant.save();
    res.status(201).json({
      _id: participant._id,
      name: participant.name,
      surname: participant.surname,
      deletionToken: participant.deletionToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Errore salvataggio partecipante",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const deletionToken = req.header("x-delete-token");
  if (!deletionToken) {
    return res.status(400).json({ message: "Token di eliminazione mancante" });
  }

  try {
    const participant = await Participant.findOneAndDelete({
      _id: req.params.id,
      deletionToken,
    });
    if (!participant) {
      return res.status(404).json({ message: "Partecipante non trovato o token non valido" });
    }
    res.json({ message: "Partecipante eliminato" });
  } catch (error) {
    console.error("Errore eliminazione partecipante:", error);
    res.status(500).json({ message: "Errore del server", error: error.message });
  }
});

export default router;