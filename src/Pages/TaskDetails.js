import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaNoteSticky } from "react-icons/fa6";
import { FaBackward, FaCalendar, FaCreativeCommons, FaTasks } from "react-icons/fa";
import { MdCelebration, MdCreate, MdUpdate } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


const TaskDetails = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t._id === id);

  if (!task) {
    return (
      <div className="task-details-container">
        <div className="task-not-found">
          <i className="fas fa-search"></i>
          <h2>Task Not Found</h2>
          <p>The task you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch(status?.toUpperCase()) {
      case 'BACKLOG': return 'status-backlog';
      case 'PENDING': return 'status-pending';
      case 'IN-PROGRESS': return 'status-in-progress';
      case 'COMPLETED': return 'status-completed';
      default: return 'status-default';
    }
  };

  return (
    <div className="task-details-container">
      <div className="task-details-card">
        <div className="task-details-header">
          <div className="task-title-section">
            <h1 className="task-title">{task.title}</h1>
            <span className={`status-badge-large ${getStatusBadgeClass(task.status)}`}>
              {task.status}
            </span>
          </div>
          <div className="task-meta">
            <span className="task-id">Task ID: {task._id}</span>
          </div>
        </div>

        <div className="task-details-content">
          <div className="detail-section">
            <div className="detail-icon">
              <FaNoteSticky className="fas fa-align-left"></FaNoteSticky>
            </div>
            <div className="detail-content">
              <h3>Description</h3>
              <p className="task-description">{task.description || "No description provided"}</p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-icon">
                <FaTasks className="fas fa-tasks"></FaTasks>
              </div>
              <div className="detail-info">
                <span className="detail-label">Status</span>
                <span className={`detail-value status-indicator ${getStatusBadgeClass(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <FaCalendar className="fas fa-calendar-day"></FaCalendar>
              </div>
              <div className="detail-info">
                <span className="detail-label">Deadline</span>
                <span className="detail-value">
                  {task.date ? new Date(task.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "Not set"}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <MdCreate className="fas fa-clock"/>
              </div>
              <div className="detail-info">
                <span className="detail-label">Created</span>
                <span className="detail-value">
                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "Unknown"}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <MdUpdate className="fas fa-sync-alt"/>
              </div>
              <div className="detail-info">
                <span className="detail-label">Last Updated</span>
                <span className="detail-value">
                  {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "Never"}
                </span>
              </div>
            </div>
          </div>

          {task.date && new Date(task.date) < new Date() && task.status !== 'COMPLETED' && (
            <div className="deadline-warning">
              <i className="fas fa-exclamation-triangle"></i>
              <span>This task is past its deadline!</span>
            </div>
          )}

          {task.status === 'COMPLETED' && (
            <div className="completion-celebration">
              <IoCheckmarkDoneCircleSharp className="fas fa-check-circle" size={50}/>
              <span>This task has been completed! 🎉</span>
            </div>
          )}
        </div>

        <div className="task-details-footer">
          <button className="back-button" onClick={() => window.history.back()}>
            <FaBackward className="fas fa-arrow-left"/>
            Back to Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;