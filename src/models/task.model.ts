export interface Task {
    id: string;
    title: string;
    list: string; // this or 
    listId: string; // this
    description?: string;
}