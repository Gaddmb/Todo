// src/api/api.ts
import axios from "axios";
import type { Task, CreateTaskData,  } from "@shared/types/task";


// alias pour un import propres 


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Vérification de l'URL de base si elle est undefined
// if(!API_BASE_URL) {
//   throw new Error("VITE_API_BASE_URL est undefined");    }


// je crée mon instance personalisée d'axios
const api = axios.create({baseURL: API_BASE_URL,});


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


// je recupere les données
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data.tasks; // 
};

// je crée une tache
export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  const response = await api.post("/tasks", taskData);
  return response.data.task; //
};


// je supprime une tach
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// je met à jour le status d'une tache
export const updateTaskStatus = async (
  id: number,
  status: "pending" | "done"
): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, { status });
  return response.data.task; 
};
// fichier API qui va me permettre de faire des appels à l'APII

