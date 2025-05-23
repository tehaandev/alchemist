"use client";

import DarkModeToggle from "./DarkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogoutUser, useUser } from "@/features/auth/auth.query";
import {
  FileText,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { data: user } = useUser();
  const [open, setOpen] = React.useState(false);
  const logoutMutation = useLogoutUser();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };
  return (
    <section className="bg-background justify flex min-h-screen w-screen flex-col items-center">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 mx-auto w-full border-b px-10 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/chat"
              className={`hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname.startsWith("/chat")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              <MessageSquare className="h-4 w-4" />
              Chat
            </Link>
            <Link
              href="/documents"
              className={`hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname === "/documents"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              <FileText className="h-4 w-4" />
              Documents
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <DarkModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="User" />
                    <AvatarFallback>
                      {user?.name.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {user?.name ?? "User"}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {user?.email ?? ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await handleLogout();
                    setOpen(false);
                  }}>
                  {logoutMutation.isPending ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <LogOut className="mr-2" size={16} />
                  )}
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-6">
                  <Link
                    href="/chat"
                    className={`hover:text-primary flex items-center gap-2 text-lg font-medium ${
                      pathname === "/chat" ? "text-primary" : ""
                    }`}
                    // onClick={() => setOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5" />
                    Chat
                  </Link>
                  <Link
                    href="/documents"
                    className={`hover:text-primary flex items-center gap-2 text-lg font-medium ${
                      pathname === "/documents" ? "text-primary" : ""
                    }`}
                    // onClick={() => setOpen(false)}
                  >
                    <FileText className="h-5 w-5" />
                    Documents
                  </Link>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => setOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => setOpen(false)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={async () => {
                        await handleLogout();
                        setOpen(false);
                      }}>
                      {!logoutMutation.isPending ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <LogOut className="mr-2" size={16} />
                      )}
                      Log out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </section>
  );
}
