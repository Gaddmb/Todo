import { useState } from 'react';
import type { CreateTaskData } from '@shared/types/task';


interface TaskFormProps {
  onSubmit: (taskData: CreateTaskData) => void;
}

// function que je vais passé au composant parent pour ajouter une nouvelle tâch
export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  //  État local pour stocker les valeurs des champs du formulaire
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // je m'assure que les données sont au bon format
    const taskData: CreateTaskData = {
      title: title.trim(),
      description: description.trim()
    };

    // On envoie les données au parent via la prop onSubmit
    onSubmit(taskData);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ddd' }}>
      <h2>Ajouter une nouvelle tâche</h2>
      
      
      
      <div style={{ marginBottom: '10px' }}>
        <label>Titre :</label>
        <input
          type="text"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Titre de la tâche"
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

 
      <div style={{ marginBottom: '10px' }}>
        <label>Description :</label>
        <textarea
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description de la tâche"
          style={{ width: '100%', padding: '5px', minHeight: '60px' }}
        />
      </div>

      
      <button type="submit" style={{ padding: '10px 20px' }}>
        Ajouter la tâche
      </button>
    </form>
  );
};


