import { useEffect, useState } from "react";
import "./App.css";
import PartecipantForm from "./components/PartecipantForm/PartecipantForm";
import Header from "./components/Header/Header";
import ConfirmedList from "./components/ConfirmedList/ConfirmedList";
import type { ParticipantItem } from "./components/ConfirmedList/ConfirmedList.model";

function App() {
  const [partecipants, setPartecipants] = useState<ParticipantItem[]>([]);

  useEffect(() => {
    const savedParticipants = localStorage.getItem("participants");
    if (savedParticipants) {
      try {
        setPartecipants(JSON.parse(savedParticipants));
      } catch {
        localStorage.removeItem("participants");
      }
    }
  }, []);

  const handlePartecipants = (participant: ParticipantItem) => {
    setPartecipants((prev) => {
      const nextParticipants = [participant, ...prev];
      localStorage.setItem("participants", JSON.stringify(nextParticipants));
      return nextParticipants;
    });
  };

  const handleDelete = (id: string) => {
    setPartecipants((prev) => {
      const nextParticipants = prev.filter((participant) => participant.id !== id);
      localStorage.setItem("participants", JSON.stringify(nextParticipants));
      return nextParticipants;
    });
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
