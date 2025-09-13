import { Skeleton } from "@/shared/components";



export const RecentReportSkeletons = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center p-2 rounded-lg">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};