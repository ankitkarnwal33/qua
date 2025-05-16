import { Skeleton } from "@/components/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fff5f0] to-[#f9e8e8] p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Title */}
        <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
        {/* Card */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Email Field */}
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
          {/* Password Field */}
          <Skeleton className="h-5 w-1/3 mt-4 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
          {/* Login Button */}
          <Skeleton className="h-12 w-full rounded-md mt-6" />
          {/* Links Row */}
          <div className="flex justify-between mt-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    </section>
  );
}
