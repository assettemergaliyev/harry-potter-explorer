"use client";

import { useEffect, useState } from "react";

type Character = {
  id: string;
  name: string;
  house: string;
  patronus: string;
  image: string;
};

type CharactersResponse = {
  data: Character[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default function CharactersCatalog() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/characters?search=${encodeURIComponent(search)}&page=${page}&limit=12`
        );

        if (!response.ok) {
          throw new Error("Не удалось загрузить персонажей");
        }

        const result: CharactersResponse = await response.json();

        setCharacters(result.data);
        setPagination(result.pagination);
      } catch {
        setError("Произошла ошибка при загрузке персонажей.");
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [search, page]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  useEffect(() => {
    const savedFavorites = localStorage.getItem("harry-potter-favorites");

    if (!savedFavorites) {
      return;
    }

    const favorites: string[] = JSON.parse(savedFavorites);

    setFavoriteIds(favorites);
  }, []);

  const visibleCharacters = showFavoritesOnly
  ? characters.filter((character) => favoriteIds.includes(character.id))
  : characters;

  return (
    <div>
      <div className="mt-8">
        <input
          type="text"
          value={search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Поиск персонажа по имени..."
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-300"
        />
      </div>

    <div className="mt-4 flex gap-3">
        <button
            onClick={() => setShowFavoritesOnly(false)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            !showFavoritesOnly
                ? "bg-amber-300 text-black"
                : "border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
        >
            Все
        </button>

        <button
            onClick={() => setShowFavoritesOnly(true)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            showFavoritesOnly
                ? "bg-amber-300 text-black"
                : "border border-white/10 text-gray-300 hover:bg-white/10"
            }`}
        >
            Только избранные
        </button>
    </div>

      <p className="mt-4 text-sm text-gray-400">
        Найдено персонажей: {pagination.total}
      </p>

      {loading && (
        <p className="mt-10 text-gray-400">Загрузка персонажей...</p>
      )}

      {error && (
        <p className="mt-10 text-red-400">{error}</p>
      )}

      {!loading && !error && visibleCharacters.length === 0 && (
        <p className="mt-10 text-gray-400">
        {showFavoritesOnly
            ? "В избранном пока нет персонажей."
            : "Персонажи не найдены."}
        </p>
      )}

      {!loading && !error && visibleCharacters.length > 0 && (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleCharacters.map((character) => (
              <a
  key={character.id}
  href={`/characters/${character.id}`}
  className="block overflow-hidden rounded-2xl border border-white/10 bg-slate-950 transition hover:-translate-y-1"
>
                <div className="aspect-[3/4] bg-slate-900">
                  {character.image ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-gray-600">
                      Нет изображения
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold">
                    {character.name}
                  </h2>

                  <p className="mt-3 text-sm text-gray-400">
                    <span className="font-medium text-white">
                      Факультет:
                    </span>{" "}
                    {character.house || "Не указан"}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    <span className="font-medium text-white">
                      Патронус:
                    </span>{" "}
                    {character.patronus || "Не указан"}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page <= 1}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Назад
            </button>

            <p className="text-sm text-gray-400">
              Страница {pagination.page} из {pagination.totalPages}
            </p>

            <button
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page >= pagination.totalPages}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Вперёд →
            </button>
          </div>
        </>
      )}
    </div>
  );
}