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

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  package: string;
  goal: string;
  status: string;
};

export default function UserTable({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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
          u.name.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower) ||
          u.city.toLowerCase().includes(lower)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
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

  const loadingDummy = [1, 2, 3, 4, 5];

  return (
    <div className="rounded-sm border shadow-sm p-4 bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <Input
          type="text"
          placeholder="Search users..."
          className="w-[250px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table className="overflow-scroll">
        <TableHeader>
          <TableRow>
            {[
              "name",
              "phone",
              "email",
              "city",
              "package",
              "status",
              "date",
            ].map((key) => (
              <TableHead key={key}>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  onClick={() => toggleSort(key as keyof User)}
                >
                  <span className="flex items-center gap-1 capitalize text-[#64748B] font-semibold">
                    {key}
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
                  <Skeleton className="h-6 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[80px]" />
                </TableCell>
              </TableRow>
            ))}
          {!isLoading &&
            filteredUsers?.map((user) => (
              <TableRow key={user.id} className=" text-[#020817]">
                <TableCell className=" font-medium">{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.package_interested}</TableCell>
                <TableCell>
                  <span
                    className={` ${
                      user.status === "success"
                        ? "bg-[#DCFCE7] text-[#166534] "
                        : user.status === "contacted"
                        ? "bg-[#DBEAFE] text-[#1E40AF] "
                        : user.status === "rejected"
                        ? "bg-[#FEE2E2] text-[#991B1B] "
                        : "bg-[#FEF9C3] text-[#854D0E]"
                    } py-1 px-2  rounded-2xl font-medium`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
              </TableRow>
            ))}
          {filteredUsers?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
