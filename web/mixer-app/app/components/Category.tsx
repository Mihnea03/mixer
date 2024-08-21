import React from 'react'

type CategoryProps = {
	name: string
	selected: string[]
	handleSelect: (name: string) => void
}

export default function Category({ name, selected, handleSelect }: CategoryProps) {
	const displayName = name[0].toUpperCase() + name.slice(1)

	return (
		<button className={`flex justify-center items-center rounded-full w-32 h-10 border-gray-500 border-opacity-35 border-2 ${selected.includes(name) ? "opacity-100" : "opacity-50"} hover:opacity-100 transition ease-in-out duration-75`}
			onClick={() => handleSelect(name)}>
			{displayName}
		</button>
	)
}
