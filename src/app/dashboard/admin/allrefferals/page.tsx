"use client";
import DashContainer from "@/components/DashContainer";
import ClientsTable from "@/components/ClientsTable";
import { useQuery } from "@tanstack/react-query";

async function fetchClients() {
  try {
    const response = await fetch(`/api/clientServices/getClients`);
    if (!response.ok)
      throw new Error(response.statusText || "Please try again later.");
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message || "Something bad happened.";
    }
  }
}
export default function AllRefferals() {
  const { data, isLoading } = useQuery({
    queryKey: ["allclients"],
    queryFn: () => fetchClients(),
  });
  console.log("Clients are", data);
  return (
    <DashContainer
      heading="All Referrals"
      subheading="All clients are listed here which has been refferred by any individual or partner."
    >
      <ClientsTable data={data} isLoading={isLoading} admin={true} />
    </DashContainer>
  );
}
