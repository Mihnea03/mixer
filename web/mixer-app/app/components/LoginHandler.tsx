'use client'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Home from './Home'

type LoginHandlerProps = {
	accessToken: string | undefined
	refreshToken: string | undefined
}

export default function LoginHandler({ accessToken, refreshToken }: LoginHandlerProps) {
	const [data, setData] = useState<UserT>();
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [currPage, setCurrPage] = useState<React.JSX.Element | undefined>(undefined);
	const [query, setQuery] = useState<string>("");

	const refreshAccessToken = async () => {
		if (!refreshToken) {
			return undefined;
		}

		const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
		const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

		if (!client_id || !client_secret) {
			return undefined;
		}

		const url = "https://accounts.spotify.com/api/token";
		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': "Basic " +
					Buffer.from(client_id + ":" + client_secret).toString("base64"),
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			}),
		}
		const resp = await fetch(url, payload);
		const result = await resp.json();
		console.log(result);

		const newAccessToken = result.access_token;

		if (newAccessToken) {
			// Set the new access token as a cookie
			document.cookie = `access_token=${newAccessToken}; path=/;`;
		}

		return newAccessToken;
	}

	const handleLogin = async () => {
		if (!accessToken) {
			return undefined;
		}

		const response = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		});

		const data = await response.json();

		if (data?.error) {
			return undefined;
		} else {
			console.log(data);
			setData(data);
			return data;
		}
	}

	useEffect(() => {
		const login = async () => {
			const result = await handleLogin();
			if (!result) {
				const newToken = await refreshAccessToken();
				if (newToken) {
					accessToken = newToken;
					handleLogin();
					setLoggedIn(true);
				}
			} else {
				setLoggedIn(true);
			}
		}

		login();
	}, []);

	useEffect(() => {
		if (data && accessToken) {
			setCurrPage(<Home query={query} setQuery={setQuery} accessToken={accessToken} />);
		}
	}, [data, accessToken]);

	return (
		data ? (
			<>
				{
					accessToken && (
						<>
							<Sidebar user={data} setCurrPage={setCurrPage} accessToken={accessToken} query={query} setQuery={setQuery} />
							<div className="flex-grow flex flex-col items-center transition-all duration-300">
								{currPage}
							</div>
						</>
					)
				}
			</>
		) : (
			<div className='flex flex-col items-center w-full'>
				<h1 className="font-bold text-3xl pt-12">Home</h1>
				<form className="mt-20" action={() => redirect("http://localhost:3000/api/login")}>
					<button className="py-3 px-5 bg-green-800 rounded-full">
						<div className='text-lg font-bold'>Log in</div></button>
				</form>
			</div>
		)
	)
}
