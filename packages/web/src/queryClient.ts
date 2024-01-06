import { contract } from "@parkingspaces/api-contract"
import { initQueryClient } from "@ts-rest/react-query"

export const restQueryClient = initQueryClient(contract, {
	baseUrl: "http://localhost:8000",
	baseHeaders: {},
})
