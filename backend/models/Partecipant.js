import mongoose from "mongoose";

const partecipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  deletionToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Partecipant = mongoose.model("Partecipant", partecipantSchema);

export default Partecipant;