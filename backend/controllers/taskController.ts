import {Request, Response} from "express";
import { Task } from '../../shared/types/task'
import { z } from "zod";

let tasks: Task[] = []

//j'ajoute une securrité en plus 
const taskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    status: z.enum(["pending", "done"])
})

export const getTasks = ()=>{}
export const createTask = () => {}
export const deleteTask = () => {}