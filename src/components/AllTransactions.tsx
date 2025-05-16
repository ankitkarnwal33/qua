/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import formatDate from "@/lib/formatDate";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type User = {
  id: number;
  upi_id: string;
  acc_holder_name: string;
  amount: string;
  created_at: string;
  status: string;
  action: string;
};

export default function AllTransactions({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const queryClient = useQueryClient();
  // Update the transactions status to paid and make the changes on user account
  interface Trans {
    id: string;
    user_id: string;
    user_type: string;
    amount: string;
    status: "completed";
  }
  const mutationPaid = useMutation({
    mutationFn: async (transactionData: Trans) => {
      const res = await fetch("/api/admin/payincentive", {
        method: "POST",
        body: JSON.stringify(transactionData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    },
    onMutate: () => {
      const toastId = toast.loading(`Please wait...`);
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      queryClient.invalidateQueries({ queryKey: ["alltransactions"] });
      toast.success(`Successfully paid the user.`, {
        id: context?.toastId,
      });
    },
    onError: (err: any, _, context) => {
      toast.error("Transaction failed.", {
        description: err.message || "Transaction failed",
        id: context?.toastId,
      });
    },
  });

  const mutationReject = useMutation({
    mutationFn: async (transactionData: Trans) => {
      const res = await fetch("/api/admin/rejectincentive", {
        method: "POST",
        body: JSON.stringify(transactionData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    },
    onMutate: () => {
      const toastId = toast.loading(`Please wait...`);
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      queryClient.invalidateQueries({ queryKey: ["alltransactions"] });
      toast.success(`Payment request has been rejected.`, {
        id: context?.toastId,
      });
    },
    onError: (err: any, _, context) => {
      toast.error("Transaction failed.", {
        description: err.message || "Transaction failed",
        id: context?.toastId,
      });
    },
  });

  // function to mutate the transaction table

  function handlePaid(transaction: any) {
    if (transaction?.user_id) {
      mutationPaid.mutate({
        id: transaction?.id,
        user_id: transaction?.user_id,
        user_type: transaction?.user_type,
        amount: transaction?.amount,
        status: "completed",
      });
    }
    return toast.error("Something went wrong. Try again");
  }

  function handleReject(transaction: any) {
    if (transaction?.user_id) {
      mutationReject.mutate({
        id: transaction?.id,
        user_id: transaction?.user_id,
        user_type: transaction?.user_type,
        amount: transaction?.amount,
        status: "completed",
      });
    }
    return toast.error("Something went wrong. Try again");
  }

  //   Filter all the users

  const filteredUsers = useMemo(() => {
    if (!data) {
      console.log("Not data");
      return;
    }
    let result = [...data];

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.acc_holder_name.toLowerCase().includes(lower) ||
          u.upi_id.toLowerCase().includes(lower) ||
          u.amount.toLowerCase().includes(lower)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (sortKey === "amount") {
        return sortOrder === "asc"
          ? parseFloat(aVal) - parseFloat(bVal)
          : parseFloat(bVal) - parseFloat(aVal);
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return result;
  }, [search, sortKey, sortOrder, data]);

  const toggleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const columns: { label: string; key: keyof User }[] = [
    { label: "amount", key: "amount" },
    { label: "UPI ID (G-Pay)", key: "upi_id" },
    { label: "Recipient", key: "acc_holder_name" },
    { label: "status", key: "status" },
    { label: "Date", key: "created_at" },
    { label: "Action", key: "action" },
  ];

  const loadingDummy = [1, 2, 3, 4, 5];

  return (
    <div className="rounded-sm border shadow-sm p-4 bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transaction History</h2>
        <Input
          type="text"
          placeholder="Search ..."
          className="w-[250px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table className="overflow-scroll">
        <TableHeader>
          <TableRow>
            {columns.map(({ label, key }) => (
              <TableHead key={key}>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => toggleSort(key)}
                >
                  <span className="flex items-center gap-1 capitalize text-[#64748B] font-semibold">
                    {label}
                    <ArrowUpDown className="h-4 w-4 cursor-pointer" />
                  </span>
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            loadingDummy?.map((number) => (
              <TableRow key={number}>
                <TableCell>
                  <Skeleton className="h-6 w-[110px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[90px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[90px]" />
                </TableCell>
              </TableRow>
            ))}
          {!isLoading &&
            filteredUsers?.map((transaction) => (
              <TableRow key={transaction?.id} className=" text-[#020817]">
                <TableCell className=" font-medium">
                  {transaction?.amount}
                </TableCell>
                <TableCell>{transaction?.upi_id}</TableCell>
                <TableCell className="flex flex-col">
                  {transaction?.acc_holder_name}{" "}
                  <span className=" bg-gray-700 mt-2 text-white rounded-4xl shadow-sm text-[10px] w-fit px-2 py-1 ">
                    {transaction?.user_type.charAt(0).toUpperCase() +
                      transaction?.user_type?.slice(1)}
                  </span>{" "}
                </TableCell>
                <TableCell>
                  <span
                    className={` ${
                      transaction?.status === "completed"
                        ? "bg-[#DCFCE7] text-[#166534] "
                        : transaction.status === "contacted"
                        ? "bg-[#DBEAFE] text-[#1E40AF] "
                        : transaction.status === "failed"
                        ? "bg-[#FEE2E2] text-[#991B1B] "
                        : "bg-[#FEF9C3] text-[#854D0E]"
                    } py-1 px-2  rounded-2xl font-medium`}
                  >
                    {transaction?.status === "completed"
                      ? "Paid"
                      : transaction?.status === "failed"
                      ? "Rejected"
                      : "Pending"}
                  </span>
                </TableCell>
                <TableCell>{formatDate(transaction.created_at)}</TableCell>
                <TableCell className=" space-x-2">
                  {transaction?.status === "pending" && (
                    <Button
                      className="text-[11px] bg-[#4CAE4F] cursor-pointer"
                      onClick={() => handlePaid(transaction)}
                    >
                      Mark Paid
                    </Button>
                  )}

                  {transaction?.status === "pending" && (
                    <Button
                      variant="destructive"
                      className="text-[11px] cursor-pointer"
                      onClick={() => handleReject(transaction)}
                    >
                      Reject
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          {filteredUsers?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No history
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
