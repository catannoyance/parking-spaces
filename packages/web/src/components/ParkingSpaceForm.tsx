import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { validationSchemas } from "@parkingspaces/db/validation"
import { TextInput } from "./form/TextInput"
import { NumberInput } from "./form/NumberInput"
import { RadioGroup } from "./form/RadioGroup"
import { Button } from "./form/Button"

const schema = validationSchemas.parkingSpace.create
type ParkingSpaceFormProps = {
	onSubmit: (parkingSpace: z.infer<typeof schema>) => void
	onCancel: () => void
}

export const ParkingSpaceForm = ({ onSubmit, onCancel }: ParkingSpaceFormProps) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	})

	return (
		<form className="w-64 p-4 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
			<TextInput label="Name" {...form.register("name")} />

			<TextInput label="Address" {...form.register("address")} />

			<NumberInput
				label="Spaces"
				step={1}
				{...form.register("maxSlots", {
					valueAsNumber: true,
				})}
			/>

			<NumberInput
				label="Latitude"
				{...form.register("coords.latitude", {
					valueAsNumber: true,
				})}
			/>

			<NumberInput
				label="Longitude"
				{...form.register("coords.longitude", {
					valueAsNumber: true,
				})}
			/>

			<RadioGroup
				label="Type"
				options={[
					{
						label: "Area",
						value: "area",
					},
					{
						label: "Linear",
						value: "linear",
					},
				]}
				register={() => form.register("locationType")}
			/>

			<RadioGroup
				label="Ownership"
				options={[
					{
						label: "Municipal",
						value: "municipal",
					},
					{
						label: "Private",
						value: "private",
					},
				]}
				register={() => form.register("ownershipType")}
			/>

			<RadioGroup
				label="Availability"
				options={[
					{
						label: "Free",
						value: "free",
					},
					{
						label: "Paid",
						value: "paid",
					},
					{
						label: "Conditional",
						value: "conditionally_free",
					},
				]}
				register={() => form.register("paymentType")}
			/>

			<div className="flex flex-row gap-2 justify-evenly [&>*]:flex-1">
				<Button type="submit" visualType="primary">
					Submit
				</Button>
				<Button type="button" visualType="secondary" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	)
}
