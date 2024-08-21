import React from 'react'
import TrackPreview from './TrackPreview'
import Carousel from '../Carousel'

type TopicResultProps = {
	title: string
	items: Array<React.JSX.Element>
}

export default function TopicResult({ title, items }: TopicResultProps) {
	return (
		<div className='flex flex-col w-2/3 self-center'>
			<div className='justify-self-start font-bold text-2xl mt-4 mb-6'>{title}</div>
			<Carousel items={
				items
			} itemsPerSlide={7} />
		</div>
	)
}
