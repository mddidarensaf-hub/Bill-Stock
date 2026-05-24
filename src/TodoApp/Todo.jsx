import React from 'react';

function Todo({ tasks, onDeleteTask }) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* যদি কোনো টাস্ক না থাকে */}
      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg italic">তালিকাটি খালি, নতুন কিছু যোগ করুন!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1 capitalize">{task.title}</h3>
                <p className="text-gray-600 text-sm">{task.desc}</p>
              </div>

              <button 
                onClick={() => onDeleteTask(index)}
                className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="মুছুন"
              >
                {/* Trash Icon */}
                <svg xmlns="http://www.w3.org" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todo;