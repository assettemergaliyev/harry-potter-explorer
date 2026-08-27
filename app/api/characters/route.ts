import { NextRequest, NextResponse } from "next/server";

const HP_API_URL = "https://hp-api.onrender.com/api/characters";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.toLowerCase() || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;

    const response = await fetch(HP_API_URL);

    if (!response.ok) {
      throw new Error("Не удалось получить данные из Harry Potter API");
    }

    const characters = await response.json();

    const filteredCharacters = characters.filter((character: { name: string }) =>
      character.name.toLowerCase().includes(search)
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedCharacters = filteredCharacters.slice(
      startIndex,
      endIndex
    );

    const total = filteredCharacters.length;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: paginatedCharacters,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Ошибка при получении персонажей:", error);

    return NextResponse.json(
      { error: "Не удалось загрузить персонажей" },
      { status: 500 }
    );
  }
}