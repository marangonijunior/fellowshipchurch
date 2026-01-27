"use client";

import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-cream">
        <AdminSidebar />
        <main className="flex-1 overflow-auto w-full lg:w-auto">
          <div className="pt-16 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
