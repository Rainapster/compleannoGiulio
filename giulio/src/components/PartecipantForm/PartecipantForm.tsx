import { useState, type FormEvent } from "react";
import type { PartecipantFormProps } from "./PartecipantFort.model";
import "./PartecipantForm.css";

const PartecipantForm = ({ handlePartecipants }: PartecipantFormProps) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedSurname = surname.trim();

    if (!trimmedName || !trimmedSurname) {
      setError("Nome e cognome sono obbligatori");
      return;
    }

    setSaving(true);

    try {
      const newParticipant = {
        id:
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: trimmedName,
        surname: trimmedSurname,
      };

      await handlePartecipants(newParticipant);
      setName("");
      setSurname("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore durante la creazione del partecipante",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="my-4 d-flex flex-column justify-content-center align-items-center">
      <h2>Conferma la tua partecipazione</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3 w-50"
      >
        <div className="d-flex flex-column">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="surname">Cognome:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        {error ? <p className="text-danger">{error}</p> : null}
        <button type="submit" disabled={saving}>
          {saving ? "Salvataggio..." : "Conferma"}
        </button>
      </form>
    </div>
  );
};
export default PartecipantForm;
