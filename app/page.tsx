export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-300">
            Школа чародейства и волшебства
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Добро пожаловать в мир Хогвартса
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Исследуйте персонажей, факультеты, заклинания и тайны волшебного мира
            Гарри Поттера.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/characters"
              className="rounded-xl bg-amber-300 px-6 py-3 font-semibold text-black transition hover:bg-amber-200"
            >
              Начать путешествие
            </a>

            <a
              href="/houses"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Узнать о факультетах
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}