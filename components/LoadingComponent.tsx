const LoadingComponent = () => (
  <div className="flex h-full w-full items-center justify-center gap-5">
    <span className="animate-spin rounded-full border px-4 py-2">HQ</span>
    <span className="animate-pulse">Loading ...</span>
  </div>
);

export default LoadingComponent;
