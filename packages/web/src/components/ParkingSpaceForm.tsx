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
	initialValues?: z.infer<typeof schema>
}

export const ParkingSpaceForm = ({
	onSubmit,
	onCancel,
	initialValues,
}: ParkingSpaceFormProps) => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: initialValues,
	})

	const watchPaymentType = form.watch("paymentType")

	return (
		<form className="w-64 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
			<TextInput label="Наименование" {...form.register("name")} />

			<TextInput label="Адрес" {...form.register("address")} />

			<NumberInput
				label="Кол-во мест"
				step={1}
				{...form.register("maxSlots", {
					valueAsNumber: true,
				})}
			/>

			<NumberInput
				label="Широта"
				{...form.register("coords.latitude", {
					valueAsNumber: true,
				})}
			/>

			<NumberInput
				label="Долгота"
				{...form.register("coords.longitude", {
					valueAsNumber: true,
				})}
			/>

			<RadioGroup
				label="Тип расположения"
				options={[
					{
						label: "Площадный",
						value: "area",
					},
					{
						label: "Линейный",
						value: "linear",
					},
				]}
				register={() => form.register("locationType")}
			/>

			<RadioGroup
				label="Принадлежность"
				options={[
					{
						label: "Муниципальная",
						value: "municipal",
					},
					{
						label: "Частная",
						value: "private",
					},
				]}
				register={() => form.register("ownershipType")}
			/>

			<RadioGroup
				label="Доспупность"
				options={[
					{
						label: "Бесплатная",
						value: "free",
					},
					{
						label: "Платная",
						value: "paid",
					},
					{
						label: "Условно бесплатная",
						value: "conditionally_paid",
					},
				]}
				register={() => form.register("paymentType")}
			/>

			{watchPaymentType === "conditionally_paid" && (
				<TextInput
					label="График платной парковки"
					{...form.register("conditionallyPaidSchedule")}
				/>
			)}

			<div className="flex flex-row gap-2 justify-evenly [&>*]:flex-1">
				<Button type="submit" visualType="primary">
					Добавить
				</Button>
				<Button type="button" visualType="secondary" onClick={onCancel}>
					Отменить
				</Button>
			</div>
		</form>
	)
}
