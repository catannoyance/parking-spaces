import { ParkingSpace } from "@parkingspaces/db/types"
import React from "react"
import { Map, MapPin, Car, Coins, Grid2X2, HelpingHand, Calendar } from "lucide-react"
import { WithIcon } from "./WithIcon"
import { Link } from "react-router-dom"
import { twJoin } from "tailwind-merge"

type ParkingSpaceProps = {
	parkingSpace: ParkingSpace
	linkTo?: string
	style: "full" | "compact"
}

export const ParkingSpaceView = React.memo(
	({ parkingSpace, linkTo, style }: ParkingSpaceProps) => {
		const { coords } = parkingSpace
		const coordsString = `${coords.latitude}, ${coords.longitude}`
		const displayLabels = style == "full"
		return (
			<div className="p-2">
				<h3
					className={twJoin(
						"text-lg font-bold",
						linkTo && "text-blue-600 hover:underline",
					)}
				>
					{linkTo ? <Link to={linkTo}>{parkingSpace.name}</Link> : parkingSpace.name}
				</h3>
				<div
					className={twJoin(
						"flex",
						style == "compact" && "flex-row gap-4",
						style == "full" && "flex-col gap-1",
					)}
				>
					<div className="flex flex-col gap-1">
						<WithIcon icon={MapPin} tooltip="Адрес">
							{displayLabels && "Адрес:"} {parkingSpace.address}
						</WithIcon>
						<WithIcon icon={Map} tooltip="Координаты">
							{displayLabels && "Координаты:"} {coordsString}
						</WithIcon>
						<WithIcon icon={Car} tooltip="Кол-во мест">
							{displayLabels && "Кол-во мест:"} {parkingSpace.maxSlots}
						</WithIcon>
						<WithIcon icon={Grid2X2} tooltip="Тип расположения">
							{displayLabels && "Тип расположения:"} {parkingSpace.locationType}
						</WithIcon>
					</div>
					<div className="flex flex-col gap-1">
						<WithIcon icon={HelpingHand} tooltip="Принадлежность">
							{displayLabels && "Принадлежность:"} {parkingSpace.ownershipType}
						</WithIcon>
						<WithIcon icon={Coins} tooltip="Доступность">
							{displayLabels && "Доступность:"} {parkingSpace.paymentType}
						</WithIcon>
						{parkingSpace.paymentType === "conditionally_paid" &&
							parkingSpace.conditionallyPaidSchedule !== null && (
								<WithIcon tooltip="Расписание" icon={Calendar}>
									{displayLabels && "Расписание:"}{" "}
									{parkingSpace.conditionallyPaidSchedule}
								</WithIcon>
							)}
					</div>
				</div>
			</div>
		)
	},
)
