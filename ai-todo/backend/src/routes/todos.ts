import express, { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

const router = express.Router();

// Get all todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new todo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { text, priority, dueDate } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Todo text is required' });
    }

    const todo = new Todo({
      text: text.trim(),
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a todo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, completed, priority, dueDate } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (text !== undefined) todo.text = text.trim();
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate ? new Date(dueDate) : undefined;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a todo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Toggle todo completion
router.patch('/:id/toggle', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router; 