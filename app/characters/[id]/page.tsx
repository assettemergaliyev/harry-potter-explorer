import FavoriteButton from "./FavoriteButton";

type Character = {
  id: string;
  name: string;
  house: string;
  dateOfBirth: string | null;
  species: string;
  ancestry: string;
  patronus: string;
  actor: string;
  image: string;
  alive: boolean;
  wand: {
    wood: string;
    core: string;
    length: number | null;
  };
};

async function getCharacter(id: string): Promise<Character> {
  const response = await fetch(
    `https://hp-api.onrender.com/api/character/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить персонажа");
  }

  const characters = await response.json();

  if (!characters.length) {
    throw new Error("Персонаж не найден");
  }

  return characters[0];
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-5xl">
        <a
          href="/characters"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Назад к персонажам
        </a>

        <div className="mt-8 grid gap-10 md:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-gray-600">
                Нет изображения
              </div>
            )}
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
              Персонаж
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              {character.name}
            </h1>
            
            <FavoriteButton characterId={character.id} />
            
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Detail label="Факультет" value={character.house} />
              <Detail label="Дата рождения" value={character.dateOfBirth} />
              <Detail label="Вид" value={character.species} />
              <Detail label="Происхождение" value={character.ancestry} />
              <Detail label="Патронус" value={character.patronus} />
              <Detail label="Актёр" value={character.actor} />
              <Detail
                label="Статус"
                value={character.alive ? "Жив" : "Погиб"}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950 p-6">
              <h2 className="text-xl font-semibold">Волшебная палочка</h2>

              <div className="mt-4 space-y-2 text-gray-400">
                <p>
                  <span className="font-medium text-white">Дерево:</span>{" "}
                  {character.wand.wood || "Не указано"}
                </p>

                <p>
                  <span className="font-medium text-white">Сердцевина:</span>{" "}
                  {character.wand.core || "Не указана"}
                </p>

                <p>
                  <span className="font-medium text-white">Длина:</span>{" "}
                  {character.wand.length
                    ? `${character.wand.length} дюйма`
                    : "Не указана"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-sm text-gray-200">
        {value || "Не указано"}
      </p>
    </div>
  );
}