export interface Task {
    id: string;
    title: string;
    description: string | null;
    completed: boolean ;
    createdAt: string ;
    updatedAt: string ;
}

export async function getTasks(): Promise<Task[]> {
    try {

    const response = await fetch('/api/tasks',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok){
        throw new Error(`Failed to fetch tasks: ${response.statusText}`)
    }

    const tasks = await response.json();

    return tasks;
    }
    catch(error){
        console.error("Error fetching tasks", error);
        throw error;
    }
}

export async function createTask(title: string, description?: string): Promise<Task>{
    try{

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, description})
    })

    if(!response.ok){
        throw new Error(`Failed to create task ${response.status}`);
    }

    const task = await response.json();
    return task;

    }
    catch(error){
        console.error("Error creating tasks", error);
        throw error;
    }
}