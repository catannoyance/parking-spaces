import { ForwardedRef, forwardRef, useId } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type NumberInputProps = {
	label: string
	step?: number
} & UseFormRegisterReturn

export const NumberInput = forwardRef(
	(
		{ label, step, ...registerProps }: NumberInputProps,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		const id = useId()

		return (
			<div className="flex flex-col gap-1">
				<label htmlFor={id} className="font-semibold">
					{label}
				</label>
				<input
					className="border border-slate-400 rounded-sm p-1"
					id={id}
					type="number"
					step={step ?? "any"}
					{...registerProps}
					ref={ref}
				/>
			</div>
		)
	},
)
