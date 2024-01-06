import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ParkingSpacesList } from "./components/ParkingSpaceList"

const queryClient = new QueryClient()
export const App = () => (
	<QueryClientProvider client={queryClient}>
		<div className="p-6">
			<ParkingSpacesList />
		</div>
	</QueryClientProvider>
)

export default App
