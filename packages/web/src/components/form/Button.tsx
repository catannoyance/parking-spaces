import { ButtonHTMLAttributes } from "react"
import { twJoin } from "tailwind-merge"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	visualType: "primary" | "secondary" | "destructive"
}

export const Button = ({ children, ...props }: ButtonProps) => (
	<button
		{...props}
		className={twJoin(
			"px-4 py-2 rounded-md font-semibold cursor-pointer",
			props.visualType === "primary" && "bg-blue-600 hover:bg-blue-700 text-white",
			props.visualType === "secondary" && "bg-blue-200 hover:bg-blue-300 text-blue-600",
			props.visualType === "destructive" && "bg-red-600 hover:bg-red-700 text-white",
		)}
	>
		{children}
	</button>
)
