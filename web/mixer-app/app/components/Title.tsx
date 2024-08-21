import React from 'react'

type TitleProps = {
	name: string
}

export default function Title({ name }: TitleProps) {
	return (
		<h1 className="font-bold text-3xl pt-12">{name}</h1>
	)
}
