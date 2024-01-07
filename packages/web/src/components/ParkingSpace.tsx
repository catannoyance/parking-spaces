import { ParkingSpace } from "@parkingspaces/db/types"
import React from "react"
import { Map, MapPin, Car, Coins, Grid2X2, HelpingHand } from "lucide-react"
import { WithIcon } from "./WithIcon"
import { Link } from "react-router-dom"

type ParkingSpaceProps = {
	parkingSpace: ParkingSpace
}

export const ParkingSpaceView = React.memo(({ parkingSpace }: ParkingSpaceProps) => {
	const { coords } = parkingSpace
	const coordsString = `${coords.latitude}, ${coords.longitude}`
	return (
		<div className="p-4 border-b border-slate-200">
			<h3 className="text-lg font-bold text-blue-600 hover:underline">
				<Link to={`/${parkingSpace.id}`}>{parkingSpace.name}</Link>
			</h3>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col gap-1">
					<WithIcon icon={MapPin} tooltip="Адрес">
						{parkingSpace.address}
					</WithIcon>
					<WithIcon icon={Map} tooltip="Координаты">
						{coordsString}
					</WithIcon>
					<WithIcon icon={Car} tooltip="Кол-во мест">
						{parkingSpace.maxSlots}
					</WithIcon>
				</div>
				<div className="flex flex-col gap-1">
					<WithIcon icon={Grid2X2} tooltip="Тип расположения">
						{parkingSpace.locationType}
					</WithIcon>
					<WithIcon icon={HelpingHand} tooltip="Принадлежность">
						{parkingSpace.ownershipType}
					</WithIcon>
					<WithIcon icon={Coins} tooltip="Доступность">
						{parkingSpace.paymentType}
					</WithIcon>
				</div>
			</div>
		</div>
	)
})
