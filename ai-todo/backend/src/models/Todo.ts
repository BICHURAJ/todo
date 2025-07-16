import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  userId?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: false, // Optional for now, can be used for user authentication later
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model<ITodo>('aiTodo', TodoSchema); 