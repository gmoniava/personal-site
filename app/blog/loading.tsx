export default function Loading() {
  return (
    <div className="p-4">
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/4 bg-neutral-300 dark:bg-neutral-700 rounded" />
            <div className="h-6 w-1/2 bg-neutral-200 dark:bg-neutral-600 rounded" />
            <div className="h-3 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
