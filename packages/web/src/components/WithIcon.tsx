import { LucideIcon } from "lucide-react"
import { memo } from "react"

type WithIconProps = {
	children: React.ReactNode
	icon: LucideIcon
	tooltip?: string
}

export const WithIcon = memo((props: WithIconProps) => (
	<div className="flex flex-row items-center gap-1" title={props.tooltip}>
		<props.icon className="inline" size={20} strokeWidth={2.5} />
		{props.children}
	</div>
))
