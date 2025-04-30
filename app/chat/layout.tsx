import { ChatSidebar } from "./components/ChatSidebar";
import AuthLayout from "@/components/AuthLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <section className="flex w-full flex-row">
        <ChatSidebar />
        <AuthLayout>
          <div className="flex-1">{children}</div>
        </AuthLayout>
      </section>
    </SidebarProvider>
  );
}
