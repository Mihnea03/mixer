import { baseImageUnknown } from '@/app/constants';
import React from 'react'

type EpisodePreviewProps = {
	episode: EpisodeT
}

export default function EpisodePreview({ episode }: EpisodePreviewProps) {
	let bestImage = baseImageUnknown;
	if (episode) {
		bestImage = episode.images.length >= 2 ? episode.images[1] : episode.images[0];
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
			<div className='text-lg font-bold'>{episode.name}</div>
		</div>
	)
}
