import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ragApiUrl = process.env.RAG_API_URL;

  if (!ragApiUrl) {
    return NextResponse.json({ error: "RAG_API_URL is not configured." }, { status: 503 });
  }

  const body = await request.json();
  if (typeof body.question !== "string" || !body.question.trim()) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  try {
    const response = await fetch(ragApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: body.question.trim() }),
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || data.error || "The RAG service returned an error." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer: data.answer });
  } catch {
    return NextResponse.json({ error: "Unable to connect to the RAG backend." }, { status: 502 });
  }
}