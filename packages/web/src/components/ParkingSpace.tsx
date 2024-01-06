import { ParkingSpace } from "@parkingspaces/db/types"
import React from "react"

type ParkingSpaceProps = {
	parkingSpace: ParkingSpace
}

export const ParkingSpaceView = React.memo(({ parkingSpace }: ParkingSpaceProps) => {
	const { coords } = parkingSpace
	const coordsString = `${coords.latitude}, ${coords.longitude}`
	return (
		<div className="p-4 border-b border-slate-200">
			<h3 className="text-lg font-bold">{parkingSpace.name}</h3>
			<p>{parkingSpace.address}</p>
			<div className="flex flex-row flex-wrap gap-2">
				<span>{coordsString}</span>
				<span>{parkingSpace.maxSlots}</span>
				<span>{parkingSpace.locationType}</span>
				<span>{parkingSpace.ownershipType}</span>
				<span>{parkingSpace.paymentType}</span>
			</div>
		</div>
	)
})
