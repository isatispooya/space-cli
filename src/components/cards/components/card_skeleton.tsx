export const CardSkeleton = () => (
    <div className="animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700 p-4">
      <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
    </div>
  );