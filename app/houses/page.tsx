const houses = [
  {
    name: "Гриффиндор",
    colors: "Алый и золотой",
    symbol: "Лев",
    icon: "🦁",
    traits: "Храбрость • Решительность • Отвага",
    description:
      "Факультет, известный храбростью, решительностью и готовностью защищать других.",
    accent: "border-red-700/60",
    badge: "bg-red-950 text-amber-300",
  },
  {
    name: "Слизерин",
    colors: "Зелёный и серебряный",
    symbol: "Змея",
    icon: "🐍",
    traits: "Амбиции • Находчивость • Целеустремлённость",
    description:
      "Факультет амбициозных, находчивых и целеустремлённых волшебников.",
    accent: "border-emerald-700/60",
    badge: "bg-emerald-950 text-emerald-200",
  },
  {
    name: "Когтевран",
    colors: "Синий и бронзовый",
    symbol: "Орёл",
    icon: "🦅",
    traits: "Ум • Знания • Любознательность",
    description:
      "Факультет тех, кто особенно ценит ум, знания, любознательность и творчество.",
    accent: "border-blue-700/60",
    badge: "bg-blue-950 text-blue-200",
  },
  {
    name: "Хаффлпафф",
    colors: "Жёлтый и чёрный",
    symbol: "Барсук",
    icon: "🦡",
    traits: "Верность • Терпение • Трудолюбие",
    description:
      "Факультет, где особенно ценятся верность, терпение, честность и трудолюбие.",
    accent: "border-yellow-600/60",
    badge: "bg-yellow-950 text-yellow-200",
  },
];

export default function HousesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Хогвартс
        </p>

        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          Факультеты Хогвартса
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
          Познакомьтесь с четырьмя факультетами школы чародейства и волшебства
          Хогвартс и узнайте, какие качества ценит каждый из них.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {houses.map((house) => (
            <article
              key={house.name}
              className={`rounded-2xl border ${house.accent} bg-slate-950 p-6 transition hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${house.badge}`}
                  >
                    {house.symbol}
                  </span>

                  <h2 className="mt-4 text-2xl font-semibold">{house.name}</h2>
                </div>

                <div className="text-5xl" aria-hidden="true">
                  {house.icon}
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-400">{house.traits}</p>

              <div className="mt-5 space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">Цвета:</span>{" "}
                  {house.colors}
                </p>
                <p>
                  <span className="font-semibold text-white">Символ:</span>{" "}
                  {house.symbol}
                </p>
              </div>

              <p className="mt-5 leading-7 text-gray-400">
                {house.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}