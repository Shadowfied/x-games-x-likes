import {
	Anchor,
	Box,
	Container,
	MantineProvider,
	Stack,
	Text,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Games } from "./components/games/Games";

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				withCSSVariables
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme: "dark" }}
			>
				<Container my={100}>
					<Stack justify="space-around">
						<Games />
						<Box>
							<Text color="dimmed" size="xs">
								Game data provided by{" "}
								<Anchor href="https://rawg.io/apidocs">RAWG</Anchor>.
							</Text>
						</Box>
					</Stack>
				</Container>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
