import React from 'react'
import Title from './Title';
import { baseImageUnknown, getImageUrl } from '../constants';

type AccountProps = {
	user: UserT
}

export default function Account({ user }: AccountProps) {
	const url = getImageUrl(user.images);

	return (
		user && (
			<>
				<Title name='Account' />
				<a className="hover:opacity-50 transition ease-in-out delay-50" href={user.external_urls.spotify}>
					<img className="sticky rounded-full origin-center border-green-500 border-4 w-32 h-32 mt-7" src={url} width={48} height={48} />
				</a>
				<div className='text-2xl font-bold mt-2 mb-2'>{user.display_name}</div>
				<div className='mb-4 flex space-x-1'>
					<h1 className='font-bold'>{user.followers.total}</h1>
					<h1>followers</h1>
				</div>
				<div>
					<div className='text-xl font-semibold mt-3'>Email: {user.email}</div>
					<div className='text-xl font-semibold mt-3'>From: {user.country}</div>
					<div className='text-xl font-semibold mt-3'>Type: {user.product.charAt(0).toUpperCase() + user.product.slice(1)} user</div>
				</div>
				<a className='underline underline-offset-2 hover:text-green-500 transition delay-50 ease-in-out mt-10' href={user.external_urls.spotify}>Open in Spotify</a>
			</>)
	)
}
