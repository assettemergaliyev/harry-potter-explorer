import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatRequest = {
  message: string;
  character: {
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
};

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, character } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Сообщение не может быть пустым" },
        { status: 400 }
      );
    }

    if (!character?.name) {
      return NextResponse.json(
        { error: "Не указан персонаж" },
        { status: 400 }
      );
    }

    const instructions = `
Ты участвуешь в ролевом диалоге и отвечаешь от имени персонажа из вселенной Гарри Поттера.

Персонаж:
Имя: ${character.name}
Факультет: ${character.house || "не указан"}
Вид: ${character.species || "не указан"}
Происхождение: ${character.ancestry || "не указано"}
Патронус: ${character.patronus || "не указан"}
Палочка:
- дерево: ${character.wand?.wood || "не указано"}
- сердцевина: ${character.wand?.core || "не указана"}
- длина: ${character.wand?.length || "не указана"}

Правила:
- Отвечай на русском языке.
- Оставайся в образе персонажа.
- Отвечай естественно и кратко, обычно 2–5 предложений.
- Не выдумывай конкретные факты, если информации недостаточно.
- Если вопрос выходит за пределы волшебного мира, отвечай в стиле персонажа.
`;

    const response = await client.responses.create({
      model: "gpt-5",
      instructions,
      input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("Ошибка LLM-чата:", error);

    return NextResponse.json(
      { error: "Не удалось получить ответ персонажа" },
      { status: 500 }
    );
  }
}