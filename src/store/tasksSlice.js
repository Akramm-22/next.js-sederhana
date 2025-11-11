import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage
const loadTasksFromStorage = () => {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    if (serializedTasks === null) {
      // Return sample data if no tasks exist
      return [
        {
          id: '1',
          title: 'Learn TailwindCSS',
          description: 'Utility first CSS framework for rapidly building custom designs',
          status: 'To-Do',
          priority: 'Low',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Learn Next.js',
          description: 'React framework for production-ready applications',
          status: 'To-Do',
          priority: 'Low',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Learn Redux',
          description: 'Understand state management with Redux Toolkit',
          status: 'In Progress',
          priority: 'Medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Learn React',
          description: 'Study components and hooks for modern web development',
          status: 'Done',
          priority: 'High',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    }
    return JSON.parse(serializedTasks);
  } catch (err) {
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedTasks);
  } catch (err) {
    console.error('Could not save tasks to localStorage:', err);
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  editingTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status || 'To-Do',
        priority: action.payload.priority || 'Low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        saveTasksToStorage(state.tasks);
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex, sourceStatus, destinationStatus } = action.payload;
      
      // Get all tasks for source and destination columns
      const sourceTasks = state.tasks.filter(task => task.status === sourceStatus);
      const destinationTasks = sourceStatus === destinationStatus 
        ? sourceTasks 
        : state.tasks.filter(task => task.status === destinationStatus);
      
      // Get the task being moved
      const taskToMove = sourceTasks[sourceIndex];
      
      if (!taskToMove) return;
      
      // Remove task from source
      const newTasks = state.tasks.filter(task => task.id !== taskToMove.id);
      
      // Update task status if moving to different column
      if (sourceStatus !== destinationStatus) {
        taskToMove.status = destinationStatus;
        taskToMove.updatedAt = new Date().toISOString();
      }
      
      // Find insertion point in the new tasks array
      const destTasksInNewArray = newTasks.filter(task => task.status === destinationStatus);
      
      if (destinationIndex === 0) {
        // Insert at beginning
        newTasks.unshift(taskToMove);
      } else if (destinationIndex >= destTasksInNewArray.length) {
        // Insert at end
        newTasks.push(taskToMove);
      } else {
        // Insert at specific position
        const targetTask = destTasksInNewArray[destinationIndex];
        const targetIndex = newTasks.findIndex(task => task.id === targetTask.id);
        newTasks.splice(targetIndex, 0, taskToMove);
      }
      
      state.tasks = newTasks;
      saveTasksToStorage(state.tasks);
    },
    
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    
    clearEditingTask: (state) => {
      state.editingTask = null;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  reorderTasks,
  setEditingTask,
  clearEditingTask,
} = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksByStatus = (status) => (state) =>
  state.tasks.tasks.filter(task => task.status === status);
export const selectEditingTask = (state) => state.tasks.editingTask;

export default tasksSlice.reducer;