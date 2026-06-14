export interface ParticipantItem {
  id: string;
  name: string;
  surname: string;
}

export interface ConfirmedListProps {
  confirmedList: ParticipantItem[];
  ownedParticipantIds: string[];
  onDelete: (id: string) => void;
}