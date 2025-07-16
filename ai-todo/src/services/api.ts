const API_BASE_URL = 'http://localhost:5000/api';

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoData {
  text: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface UpdateTodoData {
  text?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all todos
  async getTodos(): Promise<Todo[]> {
    return this.request<Todo[]>('/todos');
  }

  // Create a new todo
  async createTodo(data: CreateTodoData): Promise<Todo> {
    return this.request<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update a todo
  async updateTodo(id: string, data: UpdateTodoData): Promise<Todo> {
    return this.request<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete a todo
  async deleteTodo(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    return this.request<Todo>(`/todos/${id}/toggle`, {
      method: 'PATCH',
    });
  }
}

export const apiService = new ApiService(); 