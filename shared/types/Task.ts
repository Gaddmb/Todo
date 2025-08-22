// Interface COMPLÈTE - pour les tâches qui existent déjà 
export interface Task {
    id: number;
    title: string;
    description: string;
    status: "pending" | "done";
}



// Interface PARTIELLE - pour créer une nouvelle tâche
export interface CreateTaskData {
    title : string
    description : string
}

// fichier qui va me permettre de me servir de " plan "