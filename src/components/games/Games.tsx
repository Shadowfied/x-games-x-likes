/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Autocomplete,
	BackgroundImage,
	Box,
	Divider,
	Grid,
	TextInput,
	Title,
	Tooltip,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import { useGames } from "../../hooks/useGames";
import { Game } from "../../generated/openapi";
import { IconSearch } from "@tabler/icons-react";
import { AutocompleteGame } from "../../types/games";

export const Games = () => {
	const [searchValue, setSearchValue] = useState("");
	const debouncedSearchValue = useDebouncedValue(searchValue, 1000);
	const gameResults = useGames({ search: debouncedSearchValue[0] });

	const [name, setName] = useState("");
	const [games, setGames] = useState<Array<Game>>([]);

	const handleChange = (value: string) => {
		setSearchValue(value);
	};

	const autocompleteData = gameResults.data?.data.results
		? gameResults?.data.data.results.map((result) => {
				return {
					value: result.name ?? "",
					...result,
				};
		  })
		: [];

	const onItemSubmit = (result: AutocompleteGame) => {
		setGames((previousGames) => [...previousGames, result]);
		setSearchValue("");
	};

	const onNameChange = (event: ChangeEvent<HTMLInputElement>) =>
		setName(event.currentTarget.value);

	const removeGame = (gameToRemove: number) =>
		setGames((previousGames) =>
			previousGames.filter((_game, index) => index !== gameToRemove)
		);

	return (
		<>
			<TextInput label="Your name" onChange={onNameChange} mb={"md"} />

			{name && (
				<>
					<Autocomplete
						rightSection={<IconSearch />}
						label="Search game"
						value={searchValue}
						filter={() => true}
						disabled={gameResults.isLoading}
						data={autocompleteData}
						onChange={handleChange}
						onItemSubmit={onItemSubmit}
						mb={"md"}
					/>

					<Divider my={"xl"} />

					<Title mb="xl">
						{games.length} games {name} really likes in no particular order
					</Title>
				</>
			)}

			<Grid>
				{games.map((game, index) => (
					<Tooltip label="Click to delete" key={game.id}>
						<Grid.Col
							span={3}
							style={{ cursor: "pointer" }}
							onClick={() => removeGame(index)}
						>
							<BackgroundImage src={game.background_image ?? ""}>
								<Box h={180} />
							</BackgroundImage>
							<Title order={6}>{game.name}</Title>
						</Grid.Col>
					</Tooltip>
				))}
			</Grid>
		</>
	);
};
