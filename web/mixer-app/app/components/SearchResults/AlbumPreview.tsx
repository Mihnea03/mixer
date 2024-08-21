import { baseImageUnknown } from '@/app/constants';
import React from 'react'

type AlbumPreviewProps = {
	album: AlbumT
}

export default function AlbumPreview({ album }: AlbumPreviewProps) {
	let bestImage = baseImageUnknown
	if (album) {
		bestImage = album.images.length >= 2 ? album.images[1] : album.images[0];
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
			<div className='text-lg font-bold'>{album.name}</div>
			<div>{album.artists.length > 0 ? album.artists[0].name : "Unknown artist"}</div>
		</div>
	)
}
