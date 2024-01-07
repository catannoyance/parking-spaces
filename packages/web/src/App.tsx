import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ParkingSpacesList } from "./routes/ParkingSpaceList"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { ParkingSpaceDisplay } from "./routes/ParkingSpaceDisplay"

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		element: (
			<div className="p-6">
				<Outlet />
			</div>
		),
		children: [
			{
				path: "/",
				element: <ParkingSpacesList />,
			},
		],
	},
])
export const App = () => (
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
)

export default App
