import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { reorderTasks, selectTasks } from '../store/tasksSlice';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If no destination, return
    if (!destination) {
      return;
    }

    // If the item was dropped in the same position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(reorderTasks({
      sourceIndex: source.index,
      destinationIndex: destination.index,
      sourceStatus: source.droppableId,
      destinationStatus: destination.droppableId,
    }));
  };

  const getTaskStats = () => {
    const stats = {
      total: tasks.length,
      todo: tasks.filter(task => task.status === 'To-Do').length,
      inProgress: tasks.filter(task => task.status === 'In Progress').length,
      done: tasks.filter(task => task.status === 'Done').length,
    };
    return stats;
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
             Task Management Dashboard
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Dibuat untuk membantu dalam mengingatkan hal-hal yang perlu dilakukan
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-semibold">Total: </span>
              <span className="font-bold">{stats.total}</span>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-semibold">To-Do: </span>
              <span className="font-bold">{stats.todo}</span>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-semibold">In Progress: </span>
              <span className="font-bold">{stats.inProgress}</span>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-semibold">Done: </span>
              <span className="font-bold">{stats.done}</span>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm />

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <TaskList
              status="To-Do"
              title="To-Do"
              bgColor="bg-blue-50"
            />
            <TaskList
              status="In Progress"
              title="In Progress"
              bgColor="bg-orange-50"
            />
            <TaskList
              status="Done"
              title="Done"
              bgColor="bg-green-50"
            />
          </div>
        </DragDropContext>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-md">
          <p className="text-lg text-gray-600 mb-2">✨ <strong>Features:</strong></p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">📧 Add & Edit Tasks</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">🗑️ Delete Tasks</span>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">🚀 Drag & Drop</span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">💾 Auto Save</span>
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">🎨 Priority Colors</span>
          </div>
          <p className="text-gray-400 text-xs mt-3">Built with React, Redux Toolkit, Tailwind CSS & react-beautiful-dnd</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;