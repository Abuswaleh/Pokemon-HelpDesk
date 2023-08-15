import React, { useContext, useState } from "react";
import { exConContext } from "./app-container";

export function PokemonContainer({ pokeList }) {
	const { setExPokemon } = useContext(exConContext);
	const [searchInput, setSearchInput] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const searchHandler = (poke) => {
		if (searchInput[0] === ":") {
			return poke.type.includes(searchInput.substring(1));
		} else {
			return poke.name.includes(searchInput);
		}
	};

	return (
		<>
			<section className="search-pokemon">
				<input
					type="text"
					placeholder="search pokemons"
					value={searchInput}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setSearchInput(e.target.value.trim())}
				/>
				{isFocused && <p>ex:- "bulbasaur" or ":fire" </p>}
			</section>
			<section className="pokemon-container">
				{pokeList.map((poke) =>
					searchHandler(poke) ? (
						<div
							className={`thumb-container right-${poke.type}`}
							key={"pokemon:" + poke.id}
						>
							<small className="number">#{poke.id}</small>
							<img src={poke.image} alt={poke.name}></img>
							<h3>{poke.name.toUpperCase()}</h3>
							<small>type {poke.type}</small>
							<button
								className={"left-" + poke.type}
								onClick={() => setExPokemon(poke)}
							>
								Know more...
							</button>
						</div>
					) : null
				)}
			</section>
		</>
	);
}

//{extended && <ExtendedContent poke={poke} trigger={setExtended} />}
