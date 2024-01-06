import { useId } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type RadioGroupProps = {
	label: string
	options: {
		label: string
		value: string
	}[]
	register: () => UseFormRegisterReturn
}

export const RadioGroup = ({ label, options, register }: RadioGroupProps) => {
	const id = useId()
	return (
		<fieldset className="flex flex-col gap-1">
			<legend className="font-semibold">{label}</legend>
			{options.map(({ label, value }) => (
				<div key={value} className="flex items-center gap-1">
					<input
						className="border border-slate-400 rounded-sm p-1"
						id={id + value}
						type="radio"
						value={value}
						{...register()}
					/>
					<label htmlFor={id + value}>{label}</label>
				</div>
			))}
		</fieldset>
	)
}
