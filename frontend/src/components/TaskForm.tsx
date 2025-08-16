import { useState } from 'react';
import type { CreateTaskData } from '../types/Task';

// lorsque le formulaire est soumis, on appelle cette fonction
// elle reçoit les données de la nouvelle tâche titre et description
interface TaskFormProps {
  onSubmit: (taskData: CreateTaskData) => void;
}


// j'oublie pas que ({ onSubmit }: TaskFormProps me permet de récupérer la fonction que le parent nous a donnée 
export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  //  État local pour stocker les valeurs des champs du formulaire
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    
    //  Vérification : on s'assure que les champs ne sont pas vides (trim enlève espaces en début/fin)
    if (!title.trim() || !description.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // 📦 Création de l'objet respectant la forme CreateTaskData
    // interface TaskFormProps définit le "contrat" : elle précise que la prop onSubmit attend un objet CreateTaskData.
  // const taskData: CreateTaskData = {...} crée réellement cet objet à partir des valeurs du formulaire, pour le transmettre à
    const taskData: CreateTaskData = {
      title: title.trim(),
      description: description.trim()
    };

    // 📤 On envoie les données au parent via la prop onSubmit
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

      {/* Bouton d'envoi */}
      <button type="submit" style={{ padding: '10px 20px' }}>
        Ajouter la tâche
      </button>
    </form>
  );
};



