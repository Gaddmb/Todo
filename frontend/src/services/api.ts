// src/api/api.ts
import axios from "axios";
import type { Task, CreateTaskData,  } from "@shared/types/Task";
// alias pour un import propres 


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Vérification de l'URL de base si elle est undefined
// if(!API_BASE_URL) {
//   throw new Error("VITE_API_BASE_URL est undefined");    }


// je crée mon instance personalisée d'axios
const api = axios.create({
  baseURL: API_BASE_URL,
});


//  Intercepteur des réponses (gestion globale des erreurs)
// gère les erreurs côté front, mais provenant du backend.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.warn("Requête invalide 400.");
          break;
        case 401:
          console.warn("Non autorisé 401.");
          break;
        case 404:
          console.warn("Ressource introuvable 404.");
          break;
        case 500:
          console.error("Erreur serveur 500.");
          break;
        default:
          console.error(`Erreur inattendue (${error.response.status}).`);
      }
    } else {
      console.error("Impossible de contacter le serveur.");
    }
    return Promise.reject(error);
  }
);


// GET /tasks - Récupérer toutes les tâches
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");
  return  response.data;
  
};

// POST /tasks - Créer une nouvelle tâche
export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  const response = await api.post<Task>("/tasks", taskData);
  return response.data;
};

// DELETE /tasks/:id - Supprimer une tâche
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// PATCH /tasks/:id - Mettre à jour le statut (bonus)
export const updateTaskStatus = async (
  id: number,
  status: "pending" | "done"
): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}`, { status });
  return response.data;
};

export default api;


// fichier API qui va me permettre de faire des appels à l'API

