import React, { useEffect, useState } from 'react'
import Category from './Category'

type CategoriesProps = {
	selected: string[]
	setSelected: React.Dispatch<React.SetStateAction<string[]>>
	possible: string[]
}

export default function Categories({ selected, setSelected, possible }: CategoriesProps) {

	const handleSelect = (name: string) => {
		if (selected.includes(name)) {
			setSelected((selected) => {
				return selected.filter(cat => cat != name)
			})
		} else {
			setSelected((selected) => [...selected, name])
		}
	}

	return (
		<div className='flex flex-wrap space-x-4 gap-y-2 justify-center w-2/5'>
			{possible.map((category, index) => {
				return <Category name={category} selected={selected} handleSelect={handleSelect} key={index} />
			})}
		</div>
	)
}
