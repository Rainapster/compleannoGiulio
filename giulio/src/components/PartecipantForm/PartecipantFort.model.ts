import type { ParticipantItem } from "../ConfirmedList/ConfirmedList.model";

export interface PartecipantFormProps {
  handlePartecipants: (participant: ParticipantItem) => void;
}