"use client";

import { useState } from "react";

type Character = {
  name: string;
  house?: string;
  patronus?: string;
  ancestry?: string;
  species?: string;
  wand?: {
    wood?: string;
    core?: string;
    length?: number | null;
  };
};

type CharacterChatProps = {
  character: Character;
};

export default function CharacterChat({
  character,
}: CharacterChatProps) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReply("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          character,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Не удалось получить ответ"
        );
      }

      setReply(result.reply);
    } catch {
      setError("Не удалось получить ответ персонажа.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-950 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
        Магическая беседа
      </p>

      <h2 className="mt-2 text-2xl font-semibold">
        Поговорить с {character.name}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        Задайте вопрос персонажу и получите ответ в его стиле.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={`Например: Что ты больше всего запомнил о Хогвартсе?`}
          rows={4}
          className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-amber-300"
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="mt-4 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Думаю..." : "Отправить вопрос"}
        </button>
      </form>

      {error && (
        <p className="mt-5 text-sm text-red-400">
          {error}
        </p>
      )}

      {reply && (
        <div className="mt-6 rounded-xl border border-amber-300/20 bg-black p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Ответ {character.name}
          </p>

          <p className="mt-3 leading-7 text-gray-200">
            {reply}
          </p>
        </div>
      )}
    </section>
  );
}