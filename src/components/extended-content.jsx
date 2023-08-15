import React, { useContext } from "react";
import { exConContext } from "./app-container";

export function ExtendedContent() {
	const { exPokemon, setExPokemon } = useContext(exConContext);
	const { name, type, image, height, weight, stats } = exPokemon;

	return (
		<section className="opaquescreen">
			<section className={`expanded-overlay ${"right-" + type}`}>
				<aside className="expanded-left">
					<img
						className="expanded-image"
						src={image}
						alt={name}
					></img>
					<h3 className="expanded-name">{name}</h3>
				</aside>
				<aside className={`expanded-right ${"right-" + type}`}>
					<div className="expanded-description">
						<p>
							Weight: <span>{weight}</span>
						</p>
						<p>
							Height: <span>{height}</span>
						</p>
					</div>
					<div className="expanded-description">
						{stats.map((stat, i) => (
							<p key={`stat-${i}`}>
								Stat{i + 1}: <span>{stat.stat.name}</span>
							</p>
						))}
					</div>
					<div className="expanded-description">
						{stats.map((stat, i) => (
							<p key={`bs-${i}`}>
								Bs{i + 1}: <span>{stat.base_stat}</span>
							</p>
						))}
					</div>
				</aside>

				<button
					className="close-button"
					onClick={() => setExPokemon(false)}
				>
					x
				</button>
			</section>
		</section>
	);
}
