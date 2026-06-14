import { useEffect, useState } from "react";
import "./App.css";
import PartecipantForm from "./components/PartecipantForm/PartecipantForm";
import Header from "./components/Header/Header";
import ConfirmedList from "./components/ConfirmedList/ConfirmedList";
import type { ParticipantItem } from "./components/ConfirmedList/ConfirmedList.model";

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [partecipants, setPartecipants] = useState<ParticipantItem[]>([]);
  const [ownedParticipantTokens, setOwnedParticipantTokens] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/participants`);
        if (!response.ok) {
          throw new Error("Impossibile caricare i partecipanti");
        }

        const data = await response.json();
        const loadedParticipants = data.map(
          (item: { _id: string; name: string; surname: string }) => ({
            id: item._id,
            name: item.name,
            surname: item.surname,
          }),
        );

        setPartecipants(loadedParticipants);
      } catch (error) {
        console.error(error);
      }
    };

    const savedOwnedTokens = localStorage.getItem("ownedParticipantTokens");
    if (savedOwnedTokens) {
      try {
        setOwnedParticipantTokens(JSON.parse(savedOwnedTokens));
      } catch {
        localStorage.removeItem("ownedParticipantTokens");
      }
    }

    loadParticipants();
  }, []);

  const storeOwnedTokens = (tokens: Record<string, string>) => {
    setOwnedParticipantTokens(tokens);
    localStorage.setItem("ownedParticipantTokens", JSON.stringify(tokens));
  };

  const handlePartecipants = (
    participant: ParticipantItem & { deletionToken: string },
  ) => {
    setPartecipants((prev) => [participant, ...prev]);
    storeOwnedTokens({
      ...ownedParticipantTokens,
      [participant.id]: participant.deletionToken,
    });
  };

  const handleDelete = async (id: string) => {
    const token = ownedParticipantTokens[id];
    if (!token) {
      console.error(
        "Token di cancellazione mancante o non autorizzato per questo partecipante",
      );
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/participants/${id}`, {
        method: "DELETE",
        headers: {
          "x-delete-token": token,
        },
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.message ?? "Errore durante la cancellazione");
      }

      setPartecipants((prev) =>
        prev.filter((participant) => participant.id !== id),
      );
      const nextTokens = { ...ownedParticipantTokens };
      delete nextTokens[id];
      storeOwnedTokens(nextTokens);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-background">
      <div className="container-fluid custom">
        <div className="row g-0 min-vh-100">
          <div className="col-12 col-lg-8">
            <div className="main-content overflow-auto vh-100">
              <div className="text-center mb-4">
                <Header />
              </div>

              <PartecipantForm handlePartecipants={handlePartecipants} />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="list-panel">
              <ConfirmedList
                confirmedList={partecipants}
                ownedParticipantIds={Object.keys(ownedParticipantTokens)}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
