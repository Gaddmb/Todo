import { useState } from 'react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import type{ CreateTaskData } from '../../shared/types/Task';



function App() {
  const [refreshKey, setRefreshKey] = useState(0);

 const handleAddTask = async (taskData: CreateTaskData) => {
  try {
    
    console.log('Tâche à ajouter:', taskData); 
    setRefreshKey(prev => prev + 1);
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
    alert('Erreur lors de l\'ajout de la tâche');
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