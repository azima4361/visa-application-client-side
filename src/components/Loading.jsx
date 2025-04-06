import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-dots loading-xl text-blue-600"></span>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
