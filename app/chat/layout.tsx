import { ChatSidebar } from "./components/ChatSidebar";
import AuthLayout from "@/components/AuthLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthLayout>
      <SidebarProvider>
        <section className="flex w-full flex-row">
          <ChatSidebar />
          <div className="h-[calc(100vh-4rem)] flex-1">{children}</div>
        </section>
      </SidebarProvider>
    </AuthLayout>
  );
}
