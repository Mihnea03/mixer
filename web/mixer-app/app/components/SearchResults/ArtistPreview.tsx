import { baseImageUnknown, getImageUrl } from '@/app/constants';
import React from 'react'

type ArtistPreviewProps = {
	artist: ArtistT
}

export default function ArtistPreview({ artist }: ArtistPreviewProps) {
	const url = getImageUrl(artist.images);

	return (
		<div className='flex flex-col hover:bg-slate-900 p-2 transition ease-in-out duration-75'>
			<img className='w-40 h-40 mb-2' src={url} />
			<div className='text-lg font-bold'>{artist.name}</div>
			<div>{artist.name}</div>
		</div>
	)
}
