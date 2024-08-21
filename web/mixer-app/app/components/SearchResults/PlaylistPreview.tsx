import { baseImageUnknown } from '@/app/constants';
import React from 'react'

type PlaylistPreviewProps = {
	playlist: PlaylistT
}

export default function PlaylistPreview({ playlist }: PlaylistPreviewProps) {
	let bestImage = baseImageUnknown;
	if (playlist) {
		bestImage = playlist.images.length >= 2 ? playlist.images[1] : playlist.images[0];
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
			<div className='text-lg font-bold'>{playlist.name}</div>
			<div>{playlist.owner.display_name}</div>
		</div>
	)
}
