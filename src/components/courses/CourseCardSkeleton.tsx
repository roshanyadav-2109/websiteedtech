
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => (
  <Card className="h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
    <div className="h-2 bg-gray-200"></div>
    <CardHeader className="pb-2">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <div className="flex items-center text-sm text-gray-500">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20 ml-4" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
    <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="mb-3 sm:mb-0">
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-10 w-28" />
    </CardFooter>
  </Card>
);

export default CourseCardSkeleton;
