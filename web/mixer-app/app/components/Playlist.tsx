import React from 'react'
import { baseImageUnknown, getImageUrl } from '../constants';

type PlaylistProps = {
	playlist: PlaylistT
}

export default function Playlist({ playlist }: PlaylistProps) {
	const url = getImageUrl(playlist.images);

	return (
		playlist && (
			<div className='flex flex-grow p-4 hover:bg-gray-900'>
				<a className='flex pr-24'>
					<img className='w-32 h-32 mr-6' src={url} alt={playlist.name} />
					<div>
						<h1 className='text-xl font-semibold'>{playlist.name}</h1>
						<h1 className='text-xl mt-3'>{playlist.description ? playlist.description : "No description provided"}</h1>
					</div>
				</a>
				<div className='flex flex-col text-right justify-start'>
					<div className='flex w-full justify-end'>
						<h1 className='font-semibold mr-1'>{playlist.tracks.total}</h1>
						<h1>songs</h1>
					</div>
					<div className=''>{playlist.public ? "Public" : "Private"}</div>
					<div className='mt-auto mb-2'>
						<a className='underline underline-offset-2 hover:text-green-500 transition delay-50 ease-in-out' href={playlist.external_urls.spotify}>Open in Spotify</a>
					</div>
				</div>
			</div>
		)
	)
}
