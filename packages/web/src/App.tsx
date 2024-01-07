import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ParkingSpacesList } from "./routes/ParkingSpaceList"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { ParkingSpaceDetails } from "./routes/ParkingSpaceDetails"

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
			{
				path: "/:id",
				element: <ParkingSpaceDetails />,
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
