import { useState } from 'react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { createTask } from './services/api'; 
import type { CreateTaskData } from '../../shared/types/task';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddTask = async (taskData: CreateTaskData) => {
    try {
      
      await createTask(taskData);
      console.log('Tâche à ajouter:', taskData);
      
      // Force le rechargement de la liste
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('Erreur lors de l\'ajout  de tache');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Gestionnaire de Tâches</h1>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList key={refreshKey} />
    </div>
  );
}

export default App;