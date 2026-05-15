import { spriteUrl, shinySpriteUrl } from '../utils/pokemonData'

export default function PokemonGrid({ targetPokemon, caughtPokemon, pokemonNames, onPokemonClick }) {
  const caughtIds = new Set(caughtPokemon.map(c => c.pokemonId))

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1">
      {targetPokemon.map(id => {
        const caught = caughtIds.has(id)
        const name = pokemonNames?.[id] ?? `#${id}`
        return (
          <button
            key={id}
            onClick={() => !caught && onPokemonClick(id, name)}
            title={name}
            disabled={caught}
            className={`flex flex-col items-center p-1 rounded-lg transition-all ${
              caught
                ? 'cursor-default'
                : 'opacity-30 hover:opacity-70 hover:bg-gray-50'
            }`}
          >
            <img
              src={caught ? shinySpriteUrl(id) : spriteUrl(id)}
              alt={name}
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
          </button>
        )
      })}
    </div>
  )
}
