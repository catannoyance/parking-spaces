import { contract } from "@parkingspaces/api-contract"
import { initQueryClient } from "@ts-rest/react-query"

if (!import.meta.env.VITE_API_URL) {
	throw new Error("VITE_API_URL env variable is not set")
}

export const restQueryClient = initQueryClient(contract, {
	baseUrl: import.meta.env.VITE_API_URL,
	baseHeaders: {},
})
