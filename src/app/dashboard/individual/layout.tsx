"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  async function handleLogout(event: React.MouseEvent) {
    event.preventDefault();
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      const result = await response.json();
      console.log("Logout successful:", result);
      toast.success("Logged out");
      router.push("/");
      // Optionally redirect or update UI
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show user feedback (e.g., toast)
    }
  }
  return (
    <SidebarProvider className="">
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex items instagram-center p-3 bg-white shadow justify-between items-center pr-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex gap-4 items-center select-none gradient-2 px-4 py-1 rounded-2xl">
              <p
                className=" text-[#4B5563] font-medium cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </p>
              <div className="w-8 h-8 bg-[#4CAF50] flex items-center justify-center rounded-full text-sm cursor-pointer text-white font-semibold">
                <span>AK</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-[#F3F4F6] p-4 w-full h-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
