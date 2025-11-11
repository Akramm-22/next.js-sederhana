import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, setEditingTask } from '../store/tasksSlice';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const TaskCard = ({ task, isDragging, provided, ...props }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleEdit = () => {
    dispatch(setEditingTask(task));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Low':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To-Do':
        return 'bg-blue-50 border-blue-200';
      case 'In Progress':
        return 'bg-orange-50 border-orange-200';
      case 'Done':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      {...props}
      className={`${getStatusColor(task.status)} border-2 rounded-xl p-4 mb-3 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${
        isDragging ? 'rotate-2 shadow-lg' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-lg truncate pr-2">
          {task.title}
        </h3>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors duration-150"
            title="Edit task"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors duration-150"
            title="Delete task"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
            task.priority
          )}`}
        >
          Priority: {task.priority}
        </span>
        
        <span className="text-xs text-gray-500">
          {formatDate(task.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;