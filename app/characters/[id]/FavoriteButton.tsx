"use client";

import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  characterId: string;
};

const STORAGE_KEY = "harry-potter-favorites";

export default function FavoriteButton({
  characterId,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) {
      return;
    }

    const favorites: string[] = JSON.parse(savedFavorites);

    setIsFavorite(favorites.includes(characterId));
  }, [characterId]);

  function toggleFavorite() {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    const favorites: string[] = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    let updatedFavorites: string[];

    if (favorites.includes(characterId)) {
      updatedFavorites = favorites.filter((id) => id !== characterId);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, characterId];
      setIsFavorite(true);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className="mt-6 rounded-xl border border-amber-300 px-5 py-3 font-medium text-amber-300 transition hover:bg-amber-300 hover:text-black"
    >
      {isFavorite ? "♥ В избранном" : "♡ В избранное"}
    </button>
  );
}