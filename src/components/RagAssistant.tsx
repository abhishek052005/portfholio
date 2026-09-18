"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LoaderCircle, MessageCircle, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

function formatAnswer(value: string) {
  return value.replace(/\\n/g, "\n").trim();
}

export default function RagAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function askQuestion(value: string) {
    const trimmedQuestion = value.trim();
    if (!trimmedQuestion || isLoading) return;

    setIsOpen(true);
    setQuestion("");
    setMessages((current) => [...current, { role: "user", content: trimmedQuestion }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The RAG assistant could not answer right now.");
      }

      setMessages((current) => [...current, { role: "assistant", content: formatAnswer(data.answer) }]);
    } catch (requestError) {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: requestError instanceof Error ? requestError.message : "Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(question);
  }

  return (
    <>
      <div className="glass w-[87%] rounded-2xl border border-primary/20 p-3 text-left shadow-lg shadow-primary/5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-card-border bg-background/60 px-3">
            <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
            <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about my projects..." aria-label="Ask the RAG assistant a question" className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted/70" />
          </div>
          <button type="submit" disabled={isLoading || !question.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50">
            <Send className="h-4 w-4" />
            Ask
          </button>
        </form>
      </div>

      {isMounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm">
          <section role="dialog" aria-modal="true" aria-labelledby="rag-dialog-title" onClick={(event) => event.stopPropagation()} className="glass flex max-h-[min(680px,calc(100vh-2rem))] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-primary/25 shadow-2xl">
            <header className="flex items-center justify-between border-b border-card-border px-4 py-3">
              <div>
                <h2 id="rag-dialog-title" className="text-sm font-bold text-foreground">Portfolio assistant</h2>
                <p className="mt-0.5 text-xs text-muted">Ask about projects, skills, or experience.</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close conversation" className="rounded-lg p-2 text-muted transition hover:bg-card-border hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="min-h-48 flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3 py-2.5 text-sm leading-6 ${message.role === "user" ? "ml-auto bg-primary text-white" : "border border-card-border bg-background/60 text-foreground"}`}>
                  {message.content}
                </div>
              ))}
              {isLoading && <div className="flex items-center gap-2 text-xs text-muted"><LoaderCircle className="h-4 w-4 animate-spin text-primary" />Thinking...</div>}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-card-border p-3">
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Continue the conversation..." aria-label="Continue the conversation" autoFocus className="min-w-0 flex-1 rounded-xl border border-card-border bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-primary" />
              <button type="submit" disabled={isLoading || !question.trim()} aria-label="Send message" className="rounded-xl bg-primary p-2.5 text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}