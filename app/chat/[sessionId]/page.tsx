import Chat from "../components/Chat";
import React from "react";

export default async function ChatSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <Chat sessionId={sessionId} />;
}
