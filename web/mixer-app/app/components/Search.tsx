import React, { ChangeEvent, useEffect } from 'react'

type SearchProps = {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ query, setQuery }: SearchProps) {
	const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	}

	return (
		<div className="flex justify-center items-center my-10">
			<input className="w-5/6 h-10 p-3 rounded-full text-black" type="text" placeholder="Search..." value={query} onChange={handleQueryChange} />
		</div>
	)
}
