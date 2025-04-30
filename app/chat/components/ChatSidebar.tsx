"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useChatSessions,
  useCreateChatSession,
} from "@/features/chat/chat.query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Loader2,
  MessageSquare,
  MoreVertical,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

dayjs.extend(relativeTime);
export function ChatSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const { data: chatSessions, isLoading, error, refetch } = useChatSessions();

  // Function to create a new chat session - replace with your actual implementation

  // Extract the current chat ID from the URL if available
  const currentChatId = pathname.includes("/chat/")
    ? pathname.split("/chat/")[1]
    : null;

  // Filter chat sessions based on search query
  const filteredSessions = searchQuery
    ? chatSessions?.filter((session) =>
        session.title?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chatSessions;

  const createChatSessionMutation = useCreateChatSession();

  // Handle creating a new chat
  const handleCreateNewChat = async () => {
    try {
      setIsCreatingChat(true);
      const newSessionId = await createChatSessionMutation.mutateAsync();
      await refetch();
      router.push(`/chat/${newSessionId}`);
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  // Handle selecting a chat
  const handleSelectChat = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <Sidebar className="bg-background pt-16">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold">Chats</h2>
          {/* <SidebarTrigger /> */}
        </div>
        <div className="px-2 pt-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleCreateNewChat}
            disabled={isCreatingChat}>
            {isCreatingChat ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            New Chat
          </Button>
        </div>
        <div className="px-2 pt-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search chats..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          {isLoading ? (
            <div className="space-y-2 p-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 p-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-muted-foreground p-4 text-center text-sm">
              Error loading chats. Please try again.
            </div>
          ) : filteredSessions?.length === 0 ? (
            <div className="text-muted-foreground p-4 text-center text-sm">
              {searchQuery
                ? "No chats found."
                : "No chats yet. Start a new chat!"}
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredSessions?.map((session) => (
                <div
                  key={session.id}
                  className={`hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-start gap-3 rounded-md p-2 ${
                    currentChatId === session.id
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                  onClick={() => handleSelectChat(session.id)}>
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p
                        className="line-clamp-1 truncate text-sm break-all whitespace-normal"
                        title={session.title || "New chat"}>
                        {session.title ?? "New chat"}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100"
                            onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-3 w-3" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {}}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="text-muted-foreground flex items-center text-xs">
                      {/* <p className="truncate">
                        {session.lastMessage || "No messages yet"}
                      </p> */}
                      <span className="mx-1">·</span>
                      <p className="whitespace-nowrap">
                        {dayjs(session.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-muted-foreground p-2 text-center text-xs">
          {chatSessions?.length || 0} chat
          {chatSessions?.length !== 1 ? "s" : ""}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
