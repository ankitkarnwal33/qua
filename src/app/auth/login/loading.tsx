import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4">
      <Skeleton className=" h-10 w-10" />
      <Skeleton className=" h-10 w-10" />
      <Skeleton className=" h-10 w-10" />
      <Skeleton className=" h-10 w-10" />
      <Skeleton className=" h-10 w-10" />
      <Skeleton className=" h-10 w-10" />
      <Skeleton className=" h-10 w-10" />
    </div>
  );
}
