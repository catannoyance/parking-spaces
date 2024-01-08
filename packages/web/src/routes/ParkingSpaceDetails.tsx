import { Link, useNavigate, useParams } from "react-router-dom"
import { restQueryClient } from "../queryClient"
import { ParkingSpaceForm } from "../components/ParkingSpaceForm"
import { Button } from "../components/form/Button"
import { useCallback, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { validationSchemas } from "@parkingspaces/db/validation"
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"
import { ParkingSpaceView } from "../components/ParkingSpace"

const schema = validationSchemas.parkingSpace.create
export const ParkingSpaceDetails = () => {
	const { id } = useParams()
	const [isEditing, setIsEditing] = useState(false)
	const startEdit = useCallback(() => setIsEditing(true), [])
	const cancelEdit = useCallback(() => setIsEditing(false), [])
	const navigate = useNavigate()

	const queryClient = useQueryClient()
	useEffect(() => {
		queryClient.removeQueries(["parkingSpace"])
	}, [id, queryClient])

	const parkingSpace = restQueryClient.getParkingSpace.useQuery(["parkingSpace"], {
		params: { id: id! },
	})

	const updateParkingSpace = restQueryClient.updateParkingSpace.useMutation()
	const commitEdit = useCallback(
		(data: z.infer<typeof schema>) => {
			setIsEditing(false)
			updateParkingSpace.mutate(
				{ params: { id: id! }, body: data },
				{
					onSettled: () => {
						queryClient.removeQueries(["parkingSpace"])
					},
				},
			)
		},
		[id, queryClient, updateParkingSpace],
	)

	const deleteParkingSpaceQuery = restQueryClient.deleteParkingSpace.useMutation()
	const deleteParkingSpace = useCallback(() => {
		deleteParkingSpaceQuery.mutate(
			{ params: { id: id! } },
			{
				onSuccess: () => {
					navigate("/")
				},
			},
		)
	}, [deleteParkingSpaceQuery, id, navigate])

	if (parkingSpace.isLoading) {
		return <div>Loading...</div>
	}

	if (parkingSpace.isError) {
		return <div>Error ..</div>
	}

	const data = parkingSpace.data!.body

	const position = [data.coords.latitude, data.coords.longitude] as [number, number]
	const defaultState = {
		center: position,
		zoom: 15,
	}

	return (
		<div className="flex flex-col gap-8">
			<Link className="text-blue-600" to="/">
				&lt; Назад
			</Link>
			{!isEditing && (
				<div className="flex flex-row gap-8">
					<div className="w-96 h-96">
						<YMaps>
							<Map className="w-full h-full" defaultState={defaultState}>
								<Placemark geometry={position} />
							</Map>
						</YMaps>
					</div>
					<div className="flex flex-col gap-2">
						<ParkingSpaceView parkingSpace={data} style="full" />
						<Button visualType="primary" onClick={startEdit}>
							Редактировать
						</Button>
						<Button visualType="destructive" onClick={deleteParkingSpace}>
							Удалить
						</Button>
					</div>
				</div>
			)}
			{isEditing && (
				<ParkingSpaceForm
					initialValues={data}
					onSubmit={commitEdit}
					onCancel={cancelEdit}
				/>
			)}
		</div>
	)
}
