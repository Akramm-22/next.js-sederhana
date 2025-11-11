import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { selectTasksByStatus } from '../store/tasksSlice';
import TaskCard from './TaskCard';

const TaskList = ({ status, title, bgColor }) => {
  const tasks = useSelector(selectTasksByStatus(status));

  const getColumnColor = (status) => {
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

  const getHeaderColor = (status) => {
    switch (status) {
      case 'To-Do':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'In Progress':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      case 'Done':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  return (
    <div className={`flex-1 min-w-80 mx-2 ${getColumnColor(status)} border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className={`${getHeaderColor(status)} p-4`}>
        <h2 className="text-xl font-bold">
          {title}
          <span className="ml-2 text-sm font-normal opacity-80">
            ({tasks.length})
          </span>
        </h2>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 min-h-[600px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-blue-100' : ''
            }`}
          >
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {status === 'To-Do' ? '📅' : status === 'In Progress' ? '⏳' : '✅'}
                </div>
                <p className="text-gray-500 text-lg font-medium">No tasks yet</p>
                <p className="text-gray-400 text-sm mt-2">Drag tasks here or create a new one</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskCard
                      task={task}
                      isDragging={snapshot.isDragging}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;