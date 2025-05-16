/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Client {
  userId: string;
  refName: string;
  refPhone: string;
  refEmail: string;
  refCity: string;
  refPackage: string;
  refGoal: string;
  refNotes: string;
}

export default function RefferalForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [refPackage, setRefPackage] = useState("");
  const [refGoal, setRefGoal] = useState("");
  const [refName, setRefName] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [refCity, setRefCity] = useState("");
  const [refNotes, setRefNotes] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async (newClient: Client) => {
      const res = await fetch("/api/clientServices", {
        method: "POST",
        body: JSON.stringify(newClient),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    },
    onMutate: () => {
      const toastId = toast.loading(`Referring ${refName} ...`);
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success(`${refName} is referred.`, {
        id: context?.toastId,
      });
      // Optionally reset fields here
    },
    onError: (err: any, _, context) => {
      toast.error("Referral failed.", {
        description: err.message || "Something went wrong.",
        id: context?.toastId,
      });
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!refName) return setError("Please enter name.");
    if (!refPhone) return setError("Please enter mobile number");
    if (!refPackage) return setError("Please select package.");
    if (!refCity) return setError("Please enter city.");
    setError("");

    mutation.mutate({
      userId: id,
      refName,
      refEmail,
      refPhone,
      refCity,
      refPackage,
      refGoal,
      refNotes,
    });
  }

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-[16px] text-[#020817]">
          Submit a Referral
        </p>
        <span className=" text-[#64748B] text-[15px]">
          Submit details of someone who might be interested in our services
        </span>
      </div>

      <form
        action="#"
        className="flex flex-col gap-5 w-full text-[15px]"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="refName">Referral Name</label>
            <input
              type="text"
              placeholder="Full Name"
              name="refName"
              id="refName"
              onChange={(e) => setRefName(e.target.value)}
              className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="refPhone">Phone</label>
            <input
              type="number"
              placeholder="phone"
              name="refPhone"
              id="refPhone"
              onChange={(e) => setRefPhone(e.target.value)}
              className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="refEmail">Email</label>
            <input
              type="email"
              placeholder="email addresss"
              name="refEmail"
              id="refEmail"
              onChange={(e) => setRefEmail(e.target.value)}
              className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="refCity">City</label>
            <input
              type="text"
              placeholder="City"
              name="refCity"
              id="refCity"
              onChange={(e) => setRefCity(e.target.value)}
              className=" border border-[#E2E8F0] px-3 py-2 rounded-sm text-[#64748B] "
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="refGoal">Goal</label>
            <Select value={refGoal} onValueChange={setRefGoal}>
              <SelectTrigger className="border-1 w-full py-4 text-[15px]">
                <SelectValue placeholder="Select Goal" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-full z-20">
            <label htmlFor="refEmail">Select Package</label>
            <Select value={refPackage} onValueChange={setRefPackage}>
              <SelectTrigger className="border-1 w-full py-4 text-[15px]">
                <SelectValue placeholder="Select Package" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="refNotes">Additional Notes (Optional)</label>
            <Textarea
              placeholder="Type your message here."
              id="refNotes"
              name="refNotes"
              onChange={(e) => setRefNotes(e.target.value)}
            />
          </div>
        </div>

        {error && <p className=" text-red-600">{error}</p>}

        <button
          type="submit"
          className="gradient py-2 px-8  rounded-sm w-[200px] text-white font-medium cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-lg  transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Submit Referral"}
        </button>
      </form>
    </div>
  );
}
