"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import DashContainer from "@/components/DashContainer";
import Transactions from "@/components/Transactions";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../page";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import WithdrawalForm from "@/components/WithdrawalForm";

export const fetchUserTransactions = async (id: string, user_type: string) => {
  try {
    const response = await fetch(
      `/api/user/transactions/user_type/${user_type}/id/${id}`
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

const Incentives = () => {
  const router = useRouter();
  const [decoded, setDecoded] = useState<any>(null);
  const [eligible, setEligible] = useState<boolean>(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["userdata"],
    queryFn: () => fetchUserDetails(decoded.id, decoded.user_type),
  });

  const {
    data: userTransactions,
    isLoading: transactionsLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchUserTransactions(decoded.id, decoded.user_type),
  });

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
  if (transactionError)
    return toast.error(transactionError.message || "Something went wrong !");
  return (
    <DashContainer
      heading="Payments"
      subheading="Manage your transactions and withdraw your rewards."
    >
      <div className="flex flex-wrap gap-4 p-6 bg-gray-100">
        <div className="flex-1 min-w-[200px] bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600 text-sm mb-2">Available To Withdraw</p>
          <div className="text-2xl font-bold text-yellow-600 flex justify-between items-center">
            {isLoading && (
              <>
                {" "}
                <Skeleton className="h-8 w-[120px]" />
                <Skeleton className="h-8 w-[130px]" />
              </>
            )}
            {!isLoading && (
              <>
                <p>₹{data?.userData[0]?.incentive}</p>
                {data?.userData[0]?.incentive > 200 && (
                  <button
                    className="px-3 py-1 bg-green-100 text-green-600 rounded-sm text-[16px] shadow-sm font-semibold"
                    onClick={() => setEligible(true)}
                  >
                    Withdraw
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-[200px] bg-white p-6 rounded-xl shadow">
          <div className="text-gray-600 text-sm mb-2">Processing</div>
          {isLoading && (
            <>
              <Skeleton className="h-8 w-[150px]" />
            </>
          )}
          {!isLoading && (
            <div className="text-2xl font-bold text-blue-600">
              ₹{data?.userData[0]?.amount_processing}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[200px] bg-white p-6 rounded-xl shadow">
          <div className="text-gray-600 text-sm mb-2">Total Paid Out</div>
          {isLoading && <Skeleton className="h-8 w-[150px]" />}
          {!isLoading && (
            <div className="text-2xl font-bold text-green-600">
              ₹{data?.userData[0]?.total_paid_out}
            </div>
          )}
        </div>
      </div>
      {eligible && (
        <WithdrawalForm
          currentAmount={data?.userData[0]?.incentive}
          id={decoded.id}
          user_type={decoded.user_type}
        />
      )}

      <Transactions data={userTransactions} isLoading={transactionsLoading} />
    </DashContainer>
  );
};

export default Incentives;
