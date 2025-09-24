// KanbanBoard.jsx
import React, { useState, useEffect } from "react";
import { useTasks } from "../Hooks";
import { useSelector, shallowEqual } from "react-redux";
import KanbanContainer from "../components/specials/KanbanContainer";

const KanbanBoard = () => {
  const state = useSelector((s) => s, shallowEqual);
  const tasks = state.tasks;
  const { editTask } = useTasks();

  const [columns, setColumns] = useState({
    PENDING: { name: "Pending", items: [] },
    "IN-PROGRESS": { name: "In Progress", items: [] },
    COMPLETED: { name: "Completed", items: [] },
    BACKLOG: { name: "Backlog", items: [] },
  });

  useEffect(() => {
    setColumns({
      PENDING: { name: "Pending", items: tasks.filter((t) => t.status === "PENDING") },
      "IN-PROGRESS": { name: "In Progress", items: tasks.filter((t) => t.status === "IN-PROGRESS") },
      COMPLETED: { name: "Completed", items: tasks.filter((t) => t.status === "COMPLETED") },
      BACKLOG: { name: "Backlog", items: tasks.filter((t) => t.status === "BACKLOG") },
    });
  }, [tasks]);

  // 🔹 Handle drop
  const handleDrop = (taskId, sourceColId, destColId) => {
    if (sourceColId === destColId) return;

    const sourceItems = [...columns[sourceColId].items];
    const destItems = [...columns[destColId].items];

    const taskIndex = sourceItems.findIndex((t) => t._id === taskId);
    if (taskIndex === -1) return;

    const [movedTask] = sourceItems.splice(taskIndex, 1);
    movedTask.status = destColId;
    destItems.push(movedTask);

    setColumns({
      ...columns,
      [sourceColId]: { ...columns[sourceColId], items: sourceItems },
      [destColId]: { ...columns[destColId], items: destItems },
    });

    editTask(movedTask);
  };

  return (
    <div className="kanban-container row p-5">
      {Object.entries(columns).map(([colId, col]) => (
        <KanbanContainer
          key={colId}
          colId={colId}
          col={col}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
