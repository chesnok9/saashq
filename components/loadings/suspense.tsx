import React from 'react';

const SuspenseLoading = () => (
  <div className="flex w-full items-center justify-center">
    <div className="flex items-center space-x-5 p-20">
      <span className="animate-spin rounded-full border px-4 py-2">HQ</span>
      <span className="animate-pulse">Loading ...</span>
    </div>
  </div>
);

export default SuspenseLoading;
