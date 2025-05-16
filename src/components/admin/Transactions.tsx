"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import DashContainer from "@/components/DashContainer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import AllTransactions from "../AllTransactions";

// const fetchAdminDetails = async (id: string) => {
//   try {
//     const response = await fetch(`/api/admin/${id}`);
//     if (!response.ok)
//       throw new Error(response.statusText || "Please try again later.");
//     return await response.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//       return error.message || "Something bad happened.";
//     }
//   }
// };

export const fetchAllTransactions = async () => {
  try {
    const response = await fetch(`/api/admin/alltransactions`);
    if (!response.ok)
      throw new Error(response.statusText || "Unable to load transactions.");
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message || "Unable to load transactions.";
    }
  }
};

const TransactionsAdmin = () => {
  const router = useRouter();
  const [, setDecoded] = useState<any>(null);
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["admin"],
  //   queryFn: () => fetchAdminDetails(decoded.id),
  // });

  const {
    data: userTransactions,
    isLoading: transactionsLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["alltransactions"],
    queryFn: () => fetchAllTransactions(),
  });

  console.log(userTransactions);

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

  if (transactionError)
    return toast.error(transactionError.message || "Something went wrong !");
  return (
    <DashContainer
      heading="Payments"
      subheading="Manage your transactions and withdraw your rewards."
    >
      <div className="flex flex-wrap gap-4 p-6 bg-gray-100">
        <div className="flex-1 min-w-[200px] bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600 text-sm mb-2">Pending Payments</p>
          <div className="text-2xl font-bold text-yellow-600 flex justify-between items-center">
            {transactionsLoading && (
              <>
                {" "}
                <Skeleton className="h-8 w-[120px]" />
                <Skeleton className="h-8 w-[130px]" />
              </>
            )}
            {!transactionsLoading && (
              <p>₹{userTransactions?.rows?.total_pending}</p>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-[200px] bg-white p-6 rounded-xl shadow">
          <div className="text-gray-600 text-sm mb-2">Rejected</div>
          {transactionsLoading && (
            <>
              <Skeleton className="h-8 w-[150px]" />
            </>
          )}
          {!transactionsLoading && (
            <div className="text-2xl font-bold text-blue-600">
              ₹{userTransactions?.rows?.total_rejected}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[200px] bg-white p-6 rounded-xl shadow">
          <div className="text-gray-600 text-sm mb-2">Total Paid Out</div>
          {transactionsLoading && <Skeleton className="h-8 w-[150px]" />}
          {!transactionsLoading && (
            <div className="text-2xl font-bold text-green-600">
              ₹{userTransactions?.rows?.total_paid}
            </div>
          )}
        </div>
      </div>

      <AllTransactions
        data={userTransactions?.transactions}
        isLoading={transactionsLoading}
      />
    </DashContainer>
  );
};

export default TransactionsAdmin;
