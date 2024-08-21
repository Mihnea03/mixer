import { baseImageUnknown } from '@/app/constants';
import React from 'react'

type TrackPreviewProps = {
	track: TrackT
}

export default function TrackPreview({ track }: TrackPreviewProps) {
	let bestImage = baseImageUnknown;
	if (track) {
		bestImage = track.album.images.length >= 2 ? track.album.images[1] : track.album.images[0];
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
			<div className='text-lg font-bold'>{track.name}</div>
			<div>{track.artists.length > 0 ? track.artists[0].name : "Unknown artist"}</div>
		</div>
	)
}
