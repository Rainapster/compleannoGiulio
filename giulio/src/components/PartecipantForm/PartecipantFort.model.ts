export interface PartecipantFormProps {
  handlePartecipants: (participant: { id: string; name: string; surname: string; deletionToken: string }) => void;
}