"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [popupId, setPopupId] = useState<string | number>("");
  async function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    let id = toast.loading("Logging out...");
    setPopupId(id);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      id = toast.success("Logged out...", {
        id: popupId,
      });
      setPopupId(id);
      console.log(data);
    } catch (err) {
      id = toast.error("Logged out...", {
        id: popupId,
      });
      console.log(err);
    }
  }
  return <div onClick={handleLogout}>Logout</div>;
};

export default Page;
