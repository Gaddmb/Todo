import { useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import { getTasks, deleteTask, updateTaskStatus } from '../services/api';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await getTasks();
      

       if (Array.isArray(fetchedTasks)) {
      setTasks(fetchedTasks);
    } else {
      
      setTasks([]); // Tableau vide par défaut
      setError('Format de réponse incorrect');
    }


    
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: number, newStatus: "pending" | "done") => {
    try {
      const updatedTask = await updateTaskStatus(id, newStatus);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: 'red' }}>Erreur: {error}</div>;

  return (
    <div>
      <h2>Liste des tâches ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>Aucune tâche pour le moment</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))
      )}
    </div>
  );
};

// TaskList ici permet d'afficher la liste des tâches a jour 