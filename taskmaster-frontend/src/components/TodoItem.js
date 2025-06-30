import React from 'react';

const TodoItem = ({ todo, toggleComplete }) => {
    return (
        <div className="flex items-center gap-4 bg-[#231910] px-4 min-h-14 justify-between rounded-lg mb-2">
            <p className={`flex-1 truncate text-base ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.title}
            </p>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                className="h-5 w-5 rounded border-[#684c31] bg-transparent text-[#b95e0a]"
            />
        </div>
    );
};

export default TodoItem;
