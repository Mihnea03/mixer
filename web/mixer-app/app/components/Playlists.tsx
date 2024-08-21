import React, { useEffect, useState } from 'react'
import Playlist from './Playlist';
import Title from './Title';

type PlaylistsProps = {
	user: UserT
	accessToken: string
}

export default function Playlists({ user, accessToken }: PlaylistsProps) {

	const [playlists, setPlaylists] = useState<PlaylistListT>();

	const handleGetPlaylists = async () => {
		const url = "https://api.spotify.com/v1/me/playlists";
		const payload = {
			method: 'GET',
			headers: {
				'Authorization': "Bearer " + accessToken
			}
		}

		const resp = await fetch(url, payload);
		const data = await resp.json();
		return data;
	}

	useEffect(() => {
		const fetchPlaylists = async () => {
			setPlaylists(await handleGetPlaylists());
		}

		fetchPlaylists();
	}, []);

	return (
		<>
			<Title name='Playlists' />
			{playlists ? (
				<>
					<div className='flex text-xl mt-10 mb-8'>
						<h1>You have: </h1>
						<h2 className='mx-1 font-bold'>{playlists.total}</h2>
						<h1>playlists</h1>
					</div>
					{playlists.total > 0 &&
						<div className='space-y-8'>
							{
								playlists?.items.sort((p1, p2) => {
									if (!p1?.tracks || !p2?.tracks)
										return -1;

									return p2?.tracks.total - p1?.tracks.total
								}).map((playlist, index) => {
									return <Playlist playlist={playlist} key={index} />
								})
							}
						</div>
					}
				</>
			) : (
				<div className='flex text-xl my-8'>
					Loading...
				</div>
			)}
		</>
	)
}
