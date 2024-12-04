export interface Task {
    _id: string;
    title: string;
    content: string;
    completed: boolean;
    assignedBy?: string;
    assignedTo?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
  }
  
  export interface TodoList {
    todoId: string;
    title: string;
    owner: string;
    tasks: Task[];
    collaborators: string[];
  }
  