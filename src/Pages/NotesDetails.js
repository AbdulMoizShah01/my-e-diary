import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaNoteSticky } from "react-icons/fa6";
import { FaBackward, FaCalendar, FaCreativeCommons, FaTasks } from "react-icons/fa";
import { MdCelebration, MdCreate, MdUpdate } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


const NoteDetails = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes);
  const note = notes.find((n) => n?._id === id);

  if (!note) {
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
  return (
    <div className="task-details-container">
      <div className="task-details-card">
        <div className="task-details-header">
          <div className="task-title-section">
            <h1 className="task-title">{note?.title}</h1>
          </div>
          <div className="task-meta">
            <span className="task-id">Task ID: {note?._id}</span>
          </div>
        </div>

        <div className="task-details-content">
          <div className="detail-section">
            <div className="detail-icon">
              <FaNoteSticky className="fas fa-align-left"></FaNoteSticky>
            </div>
            <div className="detail-content">
              <h3>Description</h3>
              <p className="task-description">{note?.noted || "No description provided"}</p>
            </div>
          </div>

          <div className="details-grid">
          

   

            <div className="detail-item">
              <div className="detail-icon">
                <MdCreate className="fas fa-clock"/>
              </div>
              <div className="detail-info">
                <span className="detail-label">Created</span>
                <span className="detail-value">
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString('en-US', {
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
                  {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "Never"}
                </span>
              </div>
            </div>
          </div>

        

        <div className="task-details-footer">
          <button className="back-button" onClick={() => window.history.back()}>
            <FaBackward className="fas fa-arrow-left"/>
            Back to Notes
          </button>
        </div>
      </div>
    </div>
    </div>
  ); 
}


export default NoteDetails;