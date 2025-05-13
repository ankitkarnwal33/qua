/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import DashContainer from "@/components/DashContainer";
import Image from "next/image";
import RefferalForm from "@/components/RefferalForm";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
export const dynamic = "force-dynamic";
export const fetchClients = async (id: string) => {
  const response = await fetch(`/api/clientServices/${id}`);
  if (!response.ok) throw new Error("Cannot fetch the clients.");
  return await response.json();
};

export const fetchUserDetails = async (id: string, user_type: string) => {
  try {
    const response = await fetch(
      `/api/user/getdata/user_type/${user_type}/id/${id}`
    );
    if (!response.ok)
      throw new Error(response.statusText || "Please try again later.");
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message || "Something bad happened.";
    }
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [decoded, setDecoded] = useState<any>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(decoded.id),
  });

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchUserDetails(decoded.id, decoded.user_type),
  });

  console.log(userData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (err) {
        console.error("Failed to decode token:", err);
        router.push("/auth/login");
      }
    }
  }, [router]);

  if (error) return toast.error(error.message);
  if (userError) return toast.error(userError.message);
  let pending = 0;
  let contacted = 0;
  let success = 0;
  if (data) {
    data.map((client: { status: string }) => {
      if (client.status === "pending") pending++;
      if (client.status === "contacted") contacted++;
      // if (client.status === "converted") converted++;
      if (client.status === "success") success++;
    });
  }
  return (
    <DashContainer
      heading={`Welcome, ${
        userLoading
          ? ".............."
          : userData?.userData[0]?.name || userData?.userData[0]?.business_name
      }`}
      subheading="Manage your referrals and track your rewards."
    >
      <div className="flex gap-3 flex-wrap  justify-between">
        <div className="bg-white px-6 py-4 shadow rounded-sm min-w-[200px] flex flex-1 flex-col space-y-2 ">
          <p className="font-medium text-[#64748B] text-[15px]">Pending</p>
          {isLoading && (
            <>
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-6 w-[170px]" />
            </>
          )}
          {!isLoading && (
            <>
              <span className="flex space-x-2">
                <Image
                  src={"/icons/hourglass-half-solid.svg"}
                  width={14}
                  height={12}
                  alt="phone"
                />
                <p className="font-bold text-2xl text-yellow-400">{pending}</p>
              </span>
            </>
          )}
        </div>
        <div className="bg-white px-6 py-4 shadow rounded-sm min-w-[200px] flex flex-1 flex-col space-y-2 ">
          <p className="font-medium text-[#64748B] text-[15px]">Contacted</p>
          {!isLoading && (
            <span className="flex space-x-2">
              <Image
                src={"/icons/phone-solid.svg"}
                width={20}
                height={20}
                alt="phone"
              />
              <p className="font-black text-2xl text-[#020817]">{contacted}</p>
            </span>
          )}
          {isLoading && (
            <>
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-6 w-[170px]" />
            </>
          )}
        </div>
        <div className="bg-white px-6 py-4 shadow rounded-sm min-w-[200px] flex flex-1 flex-col space-y-2 ">
          <p className="font-medium text-[#64748B] text-[15px]">Converted</p>
          {!isLoading && (
            <>
              <span className="flex space-x-2">
                <Image
                  src={"/icons/circle-check-regular.svg"}
                  width={20}
                  height={20}
                  alt="phone"
                />
                <p className="font-black text-2xl text-[#020817]">{success}</p>
              </span>
            </>
          )}
          {isLoading && (
            <>
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-6 w-[170px]" />
            </>
          )}
        </div>
        <div className="bg-white px-6 py-4 drop-shadow-sm rounded-sm min-w-[200px] flex flex-1 flex-col space-y-2 ">
          <p className="font-medium text-[#64748B] text-[15px]">
            Total Rewards
          </p>
          {!userLoading && (
            <>
              <p className="font-bold text-2xl text-green-600 flex gap-2">
                <span>&#8377; {userData?.userData[0]?.incentive}</span>
              </p>
            </>
          )}
          {userLoading && (
            <>
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-6 w-[170px]" />
            </>
          )}
        </div>
      </div>
      <RefferalForm id={decoded?.id} />
    </DashContainer>
  );
}
