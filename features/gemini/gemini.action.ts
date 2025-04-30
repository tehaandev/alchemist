"use server";

import gemini from "@/lib/gemini";

export async function getTitleFromQueryAction(query: string) {
  try {
    const res = await gemini.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `
      Generate a concise and descriptive title for a chat session based on the following query: '${query}'. The title should summarize the main topic or intent of the query in a few (less than 10) words.
    `,
    });
    return res?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Error generating title:", error);
    return "Untitled Session";
  }
}
