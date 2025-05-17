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
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show user feedback here
    }
  }

  return (
    <SidebarProvider>
      <div className="flex bg-white w-full">
        <AppSidebar />

        {/* Make this container and its main content shrink below their children’s min-width by adding `min-w-0` */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center p-3 bg-white shadow justify-between pr-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex gap-4 items-center select-none gradient-2 px-4 py-1 rounded-2xl">
              <p
                className="text-[#4B5563] font-medium cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </p>
              <div className="w-8 h-8 bg-[#4CAF50] flex items-center justify-center rounded-full text-sm cursor-pointer text-white font-semibold">
                <span>AK</span>
              </div>
            </div>
          </header>

          {/* Confine scrolling to this element by keeping `overflow-auto` here and `min-w-0` */}
          <main className="flex-1 min-w-0 overflow-auto bg-[#F3F4F6] p-4 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
