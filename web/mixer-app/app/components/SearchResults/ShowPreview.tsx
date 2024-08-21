import { baseImageUnknown } from '@/app/constants';
import React from 'react'

type ShowPreviewProps = {
	show: ShowT
}

export default function ShowPreview({ show }: ShowPreviewProps) {
	let bestImage = baseImageUnknown;
	if (show) {
		bestImage = show.images.length >= 2 ? show.images[1] : show.images[0];
	}
	let url = undefined;
	try {
		url = bestImage.url
	} catch (e) {
		url = baseImageUnknown.url
	}

	return (
		<div className='flex flex-col hover:bg-slate-900 p-2 transition ease-in-out duration-75'>
			<img className='w-40 h-40 mb-2' src={url} />
			<div className='text-lg font-bold'>{show.name}</div>
			<div>{show.publisher}</div>
		</div>
	)
}
