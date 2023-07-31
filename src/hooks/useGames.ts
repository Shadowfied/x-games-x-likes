import { useQuery } from "react-query";
import { rawgApi } from "../lib/rawgApi";

export const useGames = ({ search }: { search?: string }) => {
	return useQuery({
		queryKey: ["games", search],
		queryFn: async () => rawgApi.gamesList(undefined, undefined, search),
		enabled: Boolean(search),
	});
};
