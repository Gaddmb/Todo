import {Request, Response} from "express";
import { Task } from '../../shared/types/task';
import { z } from "zod";


const tasks: Task[] = [
    
]

//j'ajoute une securrité en plus 
const taskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    status: z.enum(["pending", "done"])
})

// je recuepre les données des taches et affiche un message de succes
export const getTasks = (req:Request, res:Response)=>{
  res.status(200).json({ tasks })
}


export const createTask = (req: Request, res: Response) => {
    const task = req.body; // je recupere les données du corps de la requete
    
   const createTaskSchema = taskSchema.pick({ title: true, description: true });
   const validation = createTaskSchema.safeParse(task);
    if (!validation.success) {
        return res.status(400).json({
            message: "Données invalides", 
            errors: validation.error.issues,
        });
    }

    // je crée un nouveau tableau de taches avec un id auto incrementé
    const newTask = {id: tasks.length + 1, ...task, status: "pending"};

    // j'ajoute tout cela dans mon nouveau tableau bien evidement acompagné d'un message de succes
    tasks.push(newTask);
   res.status(201).json({ message: "Tâche créée avec succès", task: newTask });
}


export const deleteTask = (req:Request , res:Response) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Tâche non trouvée" });
    }

    tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Tâche supprimée avec succès" });
}




export const updateTaskStatus = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  const statusSchema = z.enum(["pending", "done"]);
  const validation = statusSchema.safeParse(status);
  
  if (!validation.success) {
    return res.status(400).json({
      message: "Status invalide",
      errors: validation.error.issues,
    });
  }
  
  const taskIndex = tasks.findIndex((task) => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }
  
  tasks[taskIndex].status = status;
  res.status(200).json({ task: tasks[taskIndex] });
};

