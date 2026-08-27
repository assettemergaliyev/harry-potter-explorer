"use client";

import { useMemo, useState } from "react";

type Spell = {
  name: string;
  category: string;
  description: string;
  icon: string;
};

const spells: Spell[] = [
  {
    name: "Expelliarmus",
    category: "Разоружающее",
    description: "Выбивает волшебную палочку или другое оружие из рук противника.",
    icon: "✨",
  },
  {
    name: "Lumos",
    category: "Световое",
    description: "Создаёт свет на кончике волшебной палочки.",
    icon: "💡",
  },
  {
    name: "Nox",
    category: "Световое",
    description: "Гасит свет, созданный заклинанием Lumos.",
    icon: "🌙",
  },
  {
    name: "Accio",
    category: "Призывающее",
    description: "Призывает предмет к волшебнику на расстоянии.",
    icon: "🪄",
  },
  {
    name: "Alohomora",
    category: "Открывающее",
    description: "Открывает запертые двери и некоторые замки.",
    icon: "🔓",
  },
  {
    name: "Protego",
    category: "Защитное",
    description: "Создаёт магический щит для защиты от заклинаний.",
    icon: "🛡️",
  },
  {
    name: "Expecto Patronum",
    category: "Защитное",
    description: "Вызывает Патронуса, который защищает волшебника от дементоров.",
    icon: "🦌",
  },
  {
    name: "Wingardium Leviosa",
    category: "Левитация",
    description: "Позволяет поднимать и перемещать предметы в воздухе.",
    icon: "🪽",
  },
  {
    name: "Riddikulus",
    category: "Защитное",
    description: "Используется против боггартов, превращая страх во что-то смешное.",
    icon: "🎭",
  },
  {
    name: "Stupefy",
    category: "Оглушающее",
    description: "Оглушает цель и временно лишает её возможности действовать.",
    icon: "⚡",
  },
  {
    name: "Reparo",
    category: "Восстанавливающее",
    description: "Исправляет и восстанавливает повреждённые предметы.",
    icon: "🛠️",
  },
  {
    name: "Petrificus Totalus",
    category: "Обездвиживающее",
    description: "Временно полностью обездвиживает тело цели.",
    icon: "🧊",
  },
];

export default function SpellsCatalog() {
  const [search, setSearch] = useState("");

  const filteredSpells = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return spells.filter((spell) =>
      spell.name.toLowerCase().includes(normalizedSearch)
    );
  }, [search]);

  return (
    <div>
      <div className="mt-8">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск заклинания..."
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-300"
        />
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Найдено заклинаний: {filteredSpells.length}
      </p>

      {filteredSpells.length === 0 ? (
        <p className="mt-10 text-gray-400">
          Заклинания не найдены.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSpells.map((spell) => (
            <article
              key={spell.name}
              className="rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:-translate-y-1"
            >
              <div className="text-4xl" aria-hidden="true">
                {spell.icon}
              </div>

              <h2 className="mt-4 text-2xl font-semibold">
                {spell.name}
              </h2>

              <p className="mt-2 text-sm text-amber-300">
                {spell.category}
              </p>

              <p className="mt-4 leading-7 text-gray-400">
                {spell.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}