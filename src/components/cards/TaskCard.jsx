import { FaEdit, FaEye } from "react-icons/fa";
import { Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  title,
  description,
  createdAt,
  onDelete,
  taskObj,
  onEdit,
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "BACKLOG":
        return "status-backlog";
      case "PENDING":
        return "status-pending";
      case "IN-PROGRESS":
        return "status-in-progress";
      case "COMPLETED":
        return "status-completed";
      default:
        return "status-default";
    }
  };

  const slicedDescription =
    description?.length > 30 ? description.slice(0, 30) + "..." : description;

  return (
    <div className="task-card">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <h5>{title}</h5>
        <Badge className={`status-badge ${getStatusColor(taskObj?.status)}`}>
          {taskObj?.status}
        </Badge>
      </div>
      <p>{slicedDescription}</p>
      <small className="d-block">
        Deadline {new Date(taskObj?.date).toLocaleDateString()}
      </small>
      <small>Created at {new Date(createdAt)?.toLocaleDateString()}</small>

      <div className="task-card-actions">
        <button className="remove-button" onClick={() => onDelete(taskObj)}>
          Delete
        </button>
        <button
          onClick={() => onEdit(taskObj)}
          className="edit-button"
          aria-label="Edit task"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => navigate(`/tasks/${taskObj?._id}`)}
          className="view-button"
          aria-label="View task details"
          title="View Task Details"
        >
          <FaEye size={20} />
  
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
