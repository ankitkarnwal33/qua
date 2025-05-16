import HeaderSkeleton from "@/components/HeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <>
      <HeaderSkeleton />
      <section className="rounded-3xl mt-4 px-10 py-16 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Text Column */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <Skeleton className="h-10 w-3/4 lg:w-2/3 mx-auto lg:mx-0" />
          <Skeleton className="h-4 w-full lg:w-5/6 mx-auto lg:mx-0" />
          <Skeleton className="h-4 w-full lg:w-5/6 mx-auto lg:mx-0" />
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-40 rounded-md" />
          </div>
        </div>

        {/* Image Column */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <Skeleton className="w-full max-w-lg h-64 md:h-80 rounded-lg" />
        </div>
      </section>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
              <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
