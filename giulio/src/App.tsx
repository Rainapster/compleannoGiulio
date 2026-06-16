import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabaseClient";
import PartecipantForm from "./components/PartecipantForm/PartecipantForm";
import Header from "./components/Header/Header";
import ConfirmedList from "./components/ConfirmedList/ConfirmedList";
import type { ParticipantItem } from "./components/ConfirmedList/ConfirmedList.model";

function App() {
  const [partecipants, setPartecipants] = useState<ParticipantItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadParticipants = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("participants")
        .select("id, name, surname")
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error(fetchError);
        setError("Errore nel caricamento dei partecipanti");
        setLoading(false);
        return;
      }

      const participantsData = data as ParticipantItem[] | null;
      setPartecipants(participantsData ?? []);
      setLoading(false);
    };

    loadParticipants();
  }, []);

  const handlePartecipants = async (participant: ParticipantItem) => {
    const { error: insertError } = await supabase
      .from("participants")
      .insert([participant]);

    if (insertError) {
      console.error(insertError);
      setError("Errore durante il salvataggio del partecipante");
      return;
    }

    setPartecipants((prev) => [participant, ...prev]);
  };

  const handleDelete = async (id: string) => {
    const { error: deleteError } = await supabase
      .from("participants")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      setError("Errore durante l'eliminazione del partecipante");
      return;
    }

    setPartecipants((prev) => prev.filter((participant) => participant.id !== id));
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
              {loading && <p className="text-center">Caricamento partecipanti...</p>}
              {error && <p className="text-danger text-center">{error}</p>}
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
