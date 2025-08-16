import type { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleStatus?: (id: number, status: "pending" | "done") => void;
}

export const TaskItem = ({ task, onDelete, onToggleStatus }: TaskItemProps) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: <strong>{task.status}</strong></p>
      
      <button onClick={() => onDelete(task.id)}>
        Supprimer
      </button>
      
      {onToggleStatus && (
        <button onClick={() => onToggleStatus(task.id, task.status === "pending" ? "done" : "pending")}>
          {task.status === "pending" ? "Marquer terminé" : "Marquer en cours"}
        </button>
      )}
    </div>
  );
};