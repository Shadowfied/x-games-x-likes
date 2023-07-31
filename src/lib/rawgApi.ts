import axios from "axios";
import { GamesApi } from "../generated/openapi";

export const rawgApi = new GamesApi(
	undefined,
	undefined,
	axios.create({
		params: {
			key: import.meta.env.VITE_RAWG_API_KEY,
		},
	})
);
