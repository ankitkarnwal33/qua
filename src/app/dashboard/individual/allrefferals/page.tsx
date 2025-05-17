/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ClientsTable from "@/components/ClientsTable";
import DashContainer from "@/components/DashContainer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchClients } from "../page";
import { jwtDecode } from "jwt-decode";
import { PieChartComponent } from "@/components/PieChartComponent";

const AllRefferals = () => {
  const router = useRouter();
  const [decoded, setDecoded] = useState<any>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(decoded.id),
    staleTime: 10000,
    refetchInterval: 60000,
  });
  // Ensure to run this code on client side
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

  // if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading clients</p>;
  return (
    <DashContainer heading="My Refferals" subheading="">
      <PieChartComponent data={data} />
      <ClientsTable data={data} isLoading={isLoading} admin={false} />
    </DashContainer>
  );
};

export default AllRefferals;
