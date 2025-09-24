import { FaEdit, FaEye } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


const NotesCard = ({title, noted, createdAt, onDelete, noteObj, onEdit}) => {
  const navigate = useNavigate();
    const slicedDescription = noted?.length > 30 ? noted.slice(0, 30) + "..." : noted;

  return (
    <div className="task-card">
        <h5>{title}</h5>
        <p>{slicedDescription}</p>
        <small>Created at {new Date(createdAt)?.toLocaleDateString()}</small>
        <div className="task-card-actions">
            <button className="remove-button"
                onClick={() => onDelete(noteObj)}
            >
                Delete
            </button>
            <button
                onClick={() => onEdit(noteObj)}
                className="edit-button"
                aria-label="Edit task"
            >
                <FaEdit size={20}/>
            </button>
            <button
                      onClick={() => navigate(`/notes/${noteObj?._id}`)}
                      className="view-button"
                      aria-label="View task"
                    >
                      <FaEye size={20} />
                    </button>
        </div>
    </div>
  )
}

export default NotesCard