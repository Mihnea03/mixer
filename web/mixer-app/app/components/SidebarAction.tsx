import React from 'react'

type SidebarActionProps = {
	actionName: string,
	action: () => void
}

export default function SidebarAction({ actionName, action }: SidebarActionProps) {
	return (
		<button onClick={action} className="hover:bg-gray-800 hover:font-bold transition ease-in-out delay-50 p-2 text-left px-4 h-10">{actionName}</button>
	)
}
