import { ChatSidebar } from "./components/ChatSidebar";
import AuthLayout from "@/components/AuthLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
// export default AuthLayout;

import React from "react";

export default function ChatLayout({
  childred,
}: Readonly<{ childred: React.ReactNode }>) {
  return (
    <AuthLayout>
      <section className="flex w-full flex-row">
        <SidebarProvider>
          <div className="max-h-[calc(100vh-4rem)]">
            <ChatSidebar />
          </div>
        </SidebarProvider>
        <div className="z-40 flex-1">{childred}</div>
      </section>
    </AuthLayout>
  );
}
