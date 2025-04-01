import OpenAI from "openai"; // Correct OpenAI import
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // Fix: Type assertion to avoid TypeScript error
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    console.log("Received messages:", messages);
    console.log("Assistant response:", completion.choices[0].message);

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "AI Service Unavailable" },
      { status: 503 }
    );
  }
}
