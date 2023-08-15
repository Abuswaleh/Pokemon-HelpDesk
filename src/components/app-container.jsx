import React, { useState, useEffect, createContext } from "react";
import { PokemonContainer } from "./pokemon-container";
import { ExtendedContent } from "./extended-content";

export const exConContext = createContext();

export function AppContainer() {
	const [pokeList, setPokeList] = useState([]);
	const [exPokemon, setExPokemon] = useState(false);
	const [isLoading, setIsLoading] = useState("More Pokemons");

	/*//limited pokemons 40 only;
	const [nextList, setNextList] = useState(
		"https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1"
	);
	function fetchApi() {
		if (!nextList) {
			console.log("no more pokemon to fetch");
			setIsLoading("sorry, no more pokemons");
			return;
		}
		setIsLoading("Loading, Please wait...");
		fetch(nextList)
			.then((res) => res.json())
			.then((data) => {
				const { results, next } = data[0];
				//const pokemons = [];
				results.map((poke) => {
					fetch(poke.url)
						.then((res) => res.json())
						.then((data) => {
							setPokeList((prev) => [...prev, data[0]]);
							//pokemons.push(data[0]);
						})
						.catch((error) => console.log(error));
				});
				setNextList(next);
				//setPokeList((prev) => [...prev, ...pokemons]);
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading("More Pokemons"));
	}
*/

	const [nameList, setNameList] = useState([]);
	const [apiOfset, setApiOfset] = useState(0);
	const pageLimit = 20;

	useEffect(() => {
		setIsLoading("Loading, Please wait...");
		fetch(
			`https://pokeapi.co/api/v2/pokemon?offset=${apiOfset}&limit=${pageLimit}`
		)
			.then((res) => res.json())
			.then((data) => setNameList(data.results))
			.catch((error) => console.log(error));
	}, [apiOfset]);

	useEffect(() => {
		nameList.map((pokeObj) => {
			fetch(pokeObj.url)
				.then((res) => res.json())
				.then((data) => {
					const {
						name,
						types: [
							{
								type: { name: type },
							},
						],
						id,
						sprites: {
							other: {
								dream_world: { front_default: image },
							},
						},
						weight,
						height,
						stats,
					} = data;
					//console.log(data);
					setPokeList((prev) => [
						...prev,
						{ name, type, id, image, weight, height, stats },
					]);
				})
				.catch((error) => console.log(error))
				.finally(() => setIsLoading("More Pokemons"));
		});
	}, [nameList]);

	useEffect(() => {
		if (exPokemon) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [exPokemon]);

	return (
		<main className="app-container">
			<section className="header-container">
				<div className="content">
					<h2>Pokomon</h2>
					<h2>Pokomon</h2>
				</div>
				<div className="content2">
					<h2>HelpDesk</h2>
					<h2>HelpDesk</h2>
				</div>
			</section>

			<exConContext.Provider value={{ exPokemon, setExPokemon }}>
				<PokemonContainer pokeList={pokeList} />
				{exPokemon && <ExtendedContent />}
			</exConContext.Provider>

			{/* {isLoading && (s
				<div className="loading">loading, please wait...</div>
			)} */}

			<button
				className="load-more"
				onClick={() => setApiOfset((prev) => prev + pageLimit)}
			>
				{isLoading}
			</button>
		</main>
	);
}
