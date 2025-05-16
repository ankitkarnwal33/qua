// components/HeaderSkeleton.tsx
"use client";

import React from "react";

export default function HeaderSkeleton() {
  return (
    <header className="flex justify-between items-center px-6 py-2 shadow-sm">
      {/* Logo placeholder */}
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

      {/* Desktop menu placeholders */}
      <ul className="hidden md:flex gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx}>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </li>
        ))}
      </ul>

      {/* Mobile menu icon placeholder */}
      <div className="md:hidden">
        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </header>
  );
}
