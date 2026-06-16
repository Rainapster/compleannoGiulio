import type { ConfirmedListProps } from "./ConfirmedList.model";
import "./ConfirmedList.css";

const ConfirmedList = ({ confirmedList, onDelete }: ConfirmedListProps) => {
  return (
    <div className="p-5 backgroundList vh-100 text-start overflow-auto">
      <h2 className="mb-4">{confirmedList?.length} Partecipanti</h2>
      {confirmedList.length ? (
        confirmedList.map((participant) => (
          <div key={participant.id} className="d-flex align-items-center justify-content-between mb-2">
            <span>{participant.name} {participant.surname}</span>
            {/* <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(participant.id)}
            >
              Elimina
            </button> */}
          </div>
        ))
      ) : (
        <p>Nessun invitato confermato</p>
      )}
    </div>
  );
};

export default ConfirmedList;
