export interface Task {
    id: string;
    title: string;
    listId: string; 
    completed: boolean;
    description?: string;
}