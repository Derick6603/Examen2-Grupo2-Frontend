export interface TaskItem {
  id: string;
  title: string;
  priorityLevel: number;
  notes?: string | null;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  priorityLevel: number;
  notes?: string | null;
}
