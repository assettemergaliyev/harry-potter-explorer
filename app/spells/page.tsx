import SpellsCatalog from "./SpellsCatalog";

export default function SpellsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Волшебная книга
        </p>

        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          Заклинания
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Исследуйте известные заклинания волшебного мира и находите нужное по названию.
        </p>

        <SpellsCatalog />
      </div>
    </main>
  );
}