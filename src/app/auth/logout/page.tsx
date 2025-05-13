"use client";

import React from "react";

const page = () => {
  async function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  return <div onClick={handleLogout}>Logout</div>;
};

export default page;
