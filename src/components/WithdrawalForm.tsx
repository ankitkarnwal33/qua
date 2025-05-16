/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Transaction {
  name: string;
  amount: string;
  upiId: string;
  id: string;
  user_type: string;
  message: string;
}

export default function WithdrawalForm({
  currentAmount,
  id,
  user_type,
}: {
  currentAmount: string;
  id: string;
  user_type: string;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  console.log(agree);
  const mutation = useMutation({
    mutationFn: async (transaction: Transaction) => {
      const res = await fetch("/api/transaction/withdraw", {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    },

    onMutate: () => {
      const toastId = toast.loading("Requesting ...");
      return { toastId };
    },

    onSuccess: (data, _, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
      toast.success(`${data.message}`, {
        id: context?.toastId,
      });
    },
    onError: (err: any) => {
      toast.error("Withdrawal failed.", {
        description: err.message || "Something went wrong.",
      });
    },
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!amount) return setError("Please enter amount.");

    if (!name) return setError("Please enter Account Holder name.");

    if (!upiId) return setError("Please enter your UPI ID.");
    if (+currentAmount < +amount) {
      setError("");
      return toast.error("Insufficient Balance 😢");
    }
    if (!agree) {
      setError("");
      return toast.error("Please confirm the withdrawal.");
    }
    setError("");

    mutation.mutate({
      name,
      amount,
      upiId,
      id,
      user_type,
      message,
    });
  }
  return (
    <div className="bg-white rounded-2xl shadow p-8 w-full mx-auto">
      <h2 className="text-xl font-bold mb-1">Withdraw Funds</h2>
      <p className="text-muted-foreground mb-6">
        Submit your withdrawal details for processing
      </p>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Amount */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        {/* Account Holder Name */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="accName">Account Holder Name</Label>
          <Input
            id="accName"
            type="text"
            name="acc_holder_name"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* UPI ID (single column full width) */}
        <div className="flex flex-col space-y-1 md:col-span-2">
          <Label htmlFor="upi">UPI ID</Label>

          <Input
            id="upi"
            type="text"
            name="upi_id"
            placeholder="example@upi"
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>

        {/* Optional Notes */}
        <div className="flex flex-col space-y-1 md:col-span-2">
          <Label htmlFor="notes">Additional Notes (Optional)</Label>
          <Textarea
            id="notes"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter any message or instructions"
          />
        </div>

        <div className="flex space-x-3 md:col-span-2">
          <Checkbox
            id="agree"
            className="border border-[#1369B1]"
            onCheckedChange={() => setAgree(!agree)}
          />
          <Label htmlFor="agree" className="text-[#020817]">
            I confirm that the UPI ID entered is mine and valid.
          </Label>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <p className="text-red-800 font-semibold  mb-2">{error}</p>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 w-fit cursor-pointer text-white text-base font-medium">
            Submit Withdrawal
          </Button>
        </div>
      </form>
    </div>
  );
}
