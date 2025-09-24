import React, { useState } from "react";
import { Card, CardHeader, CardBody, Modal, ModalBody } from "reactstrap";
import TaskCard from "../cards/TaskCard";
import TaskForm from "../forms/TaskForm";
import { useTasks } from "../../Hooks";


const KanbanContainer = ({ colId, col, onDrop }) => {
  const [draggedId, setDraggedId] = useState(null);
  const { editTask, tasks, removeTask } = useTasks();
  const [taskTObeEdited, setTasktoBeEdited] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const allowDrop = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColId = e.dataTransfer.getData("sourceColId");
    if (taskId) onDrop(taskId, sourceColId, colId);

    cleanupGhost();
    setDraggedId(null);
    setIsDragOver(false);
  };

  const cleanupGhost = () => {
    const ghost = document.getElementById("drag-ghost");
    if (ghost) ghost.remove();
  };

  const createGhost = (node, x, y) => {
    const ghost = node.cloneNode(true);
    ghost.id = "drag-ghost";
    ghost.className = "drag-ghost";
    ghost.style.position = "fixed";
    ghost.style.pointerEvents = "none";
    ghost.style.top = `${y}px`;
    ghost.style.left = `${x}px`;
    ghost.style.width = `${node.offsetWidth}px`;
    ghost.style.opacity = "1";
    ghost.style.transform = " scale(1.02)";
    ghost.style.zIndex = "9999";
    ghost.style.boxShadow = "0 10px 25px rgba(31, 52, 93, 0.3)";
    document.body.appendChild(ghost);
  };

  const getColumnIcon = () => {
    switch(colId) {
      case 'todo': return 'fas fa-circle';
      case 'inProgress': return 'fas fa-spinner';
      case 'review': return 'fas fa-eye';
      case 'done': return 'fas fa-check-circle';
      default: return 'fas fa-columns';
    }
  };

  const getColumnGradient = () => {
    switch(colId) {
      case 'todo': return 'column-gradient-todo';
      case 'inProgress': return 'column-gradient-inprogress';
      case 'review': return 'column-gradient-review';
      case 'done': return 'column-gradient-done';
      default: return 'column-gradient-default';
    }
  };

  return (
  
    <div className="kanban-col col-md-6 col-lg-4 col-xl-3 mt-3 p-1" >
      <Card className="kanban-column">
        <CardHeader className={`kanban-column-header ${getColumnGradient()}`}>
          <div className="column-title">
            <i className={getColumnIcon()}></i>
            <span className="column-name">{col.name}</span>
          </div>
          <span className="kanban-badge">{col.items.length}</span>
        </CardHeader>
        <CardBody
          className={`kanban-dropzone ${isDragOver ? 'dragging-over' : ''}`}
          onDragOver={allowDrop}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {col.items.map((item) => (
            <div
              key={item._id}
              className={`draggable-task ${
                draggedId === item._id ? "dragging" : ""
              }`}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("taskId", item._id);
                e.dataTransfer.setData("sourceColId", colId);
                e.dataTransfer.setDragImage(new Image(), 0, 0);
                setDraggedId(item._id);
                createGhost(e.currentTarget, e.clientX, e.clientY);
              }}
              onDrag={(e) => {
                const ghost = document.getElementById("drag-ghost");
                if (ghost && e.clientX && e.clientY) {
                  ghost.style.top = `${e.clientY - ghost.offsetHeight / 2}px`;
                  ghost.style.left = `${e.clientX - ghost.offsetWidth / 2}px`;
                }
              }}
              onDragEnd={() => {
                cleanupGhost();
                setDraggedId(null);
                setIsDragOver(false);
              }}
            >
              <TaskCard
                onDelete={removeTask}
                onEdit={setTasktoBeEdited}
                taskObj={item}
                {...item}
              />
            </div>
          ))}
          {col.items.length === 0 && (
            <div className="empty-column-state">
              <i className="fas fa-inbox"></i>
              <p>No Tasks Available.</p>
            </div>
          )}
        </CardBody>
      </Card>
      
      <Modal 
        centered 
        className="kanban-modal" 
        isOpen={taskTObeEdited} 
        toggle={() => setTasktoBeEdited(false)}
      >
        <ModalBody className="modal-body">
          <div className="modal-header">
            <h3>Edit Task</h3>
            <button 
              className="close-btn" 
              onClick={() => setTasktoBeEdited(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <TaskForm
            onSubmit={(obj) => {
              editTask(obj);
              setTasktoBeEdited(false);
            }}
            prevState={taskTObeEdited}
            taskArray={tasks}
            title={"Edit Task"}
          />
        </ModalBody>
      </Modal>
    </div>
   
  );
};

export default KanbanContainer;