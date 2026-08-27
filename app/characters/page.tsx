import CharactersCatalog from "./CharactersCatalog";

export default function CharactersPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Волшебный мир
        </p>

        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          Персонажи
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Изучайте персонажей волшебного мира, находите их по имени и
          просматривайте информацию о факультете и патронусе.
        </p>

        <CharactersCatalog />
      </div>
    </main>
  );
}