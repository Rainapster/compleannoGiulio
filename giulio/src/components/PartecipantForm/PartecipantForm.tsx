import { useState, type FormEvent } from "react";
import type { PartecipantFormProps } from "./PartecipantFort.model";
import "./PartecipantForm.css";

const PartecipantForm = ({ handlePartecipants }: PartecipantFormProps) => {
//   const onSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handlePartecipants(e.currentTarget.name, e.currentTarget.surname);
//   };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [, setError] = useState<string | null>(null);
  const [, setSaving] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedSurname = surname.trim();

    if (!trimmedName || !trimmedSurname) {
      setError("Nome e cognome sono obbligatori");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${apiBaseUrl}/api/participants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          surname: trimmedSurname,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.message ?? "Errore invio dati");
      }

      const participant = await response.json();
      handlePartecipants({
        id: participant._id,
        name: participant.name,
        surname: participant.surname,
        deletionToken: participant.deletionToken,
      });

      setName("");
      setSurname("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore durante l'invio al server",
      );
    } finally {
      setSaving(false);
    }
  };
//   const onSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handlePartecipants(name.trim(), surname.trim());
//   };

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
        <button type="submit">Conferma</button>
      </form>
    </div>
  );
};
export default PartecipantForm;
