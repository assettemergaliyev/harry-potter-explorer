import { NextRequest, NextResponse } from "next/server";

const HP_API_URL = "https://hp-api.onrender.com/api/character";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const response = await fetch(`${HP_API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Не удалось получить данные персонажа");
    }

    const characters = await response.json();

    if (!characters.length) {
      return NextResponse.json(
        { error: "Персонаж не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(characters[0]);
  } catch (error) {
    console.error("Ошибка при получении персонажа:", error);

    return NextResponse.json(
      { error: "Не удалось загрузить персонажа" },
      { status: 500 }
    );
  }
}