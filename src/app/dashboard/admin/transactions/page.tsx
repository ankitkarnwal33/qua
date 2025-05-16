import TransactionsAdmin from "@/components/admin/Transactions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Transactions",
  description:
    "This is the quanutrition.in webstite for official referral program of RD Nutrition private limited by Mr. Ryan Fernando.",
};
export default async function page() {
  return <TransactionsAdmin></TransactionsAdmin>;
}
