import { useCallback, useState } from "react"
import { restQueryClient } from "../queryClient"
import { ParkingSpaceView } from "../components/ParkingSpace"
import { ParkingSpaceForm } from "../components/ParkingSpaceForm"
import { Button } from "../components/form/Button"
import { useQueryClient } from "@tanstack/react-query"
import { validationSchemas } from "@parkingspaces/db/validation"
import { z } from "zod"

const parkingSpaceSchema = validationSchemas.parkingSpace.create

export const ParkingSpacesList = () => {
	const [isAdding, setIsAdding] = useState(false)
	const queryClient = useQueryClient()

	const query = restQueryClient.getParkingSpaces.useQuery(["getParkingSpaces"])
	const addParkingSpaceQuery = restQueryClient.createParkingSpace.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries(["getParkingSpaces"])
		},
	})

	const handleAddParkingSpace = useCallback(
		(parkingSpace: z.infer<typeof parkingSpaceSchema>) => {
			addParkingSpaceQuery.mutate({
				body: parkingSpace,
			})
			setIsAdding(false)
		},
		[addParkingSpaceQuery, setIsAdding],
	)

	return (
		<div className="flex flex-col gap-2">
			{!isAdding && (
				<Button visualType="primary" onClick={() => setIsAdding(true)}>
					+ Add
				</Button>
			)}
			{isAdding && (
				<ParkingSpaceForm
					onSubmit={handleAddParkingSpace}
					onCancel={() => setIsAdding(false)}
				/>
			)}
			{query.data?.body?.map(space => (
				<ParkingSpaceView parkingSpace={space} key={space.id} />
			))}
		</div>
	)
}
