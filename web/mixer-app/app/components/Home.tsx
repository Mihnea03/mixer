import React, { useEffect, useState } from 'react'
import Search from './Search'
import Title from './Title'
import Categories from './Categories'
import SearchResult from './SearchResults/SearchResult'

type HomeProps = {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
	accessToken: string
}

export default function Home({ query, setQuery, accessToken }: HomeProps) {
	const [selected, setSelected] = useState<Array<string>>([]);
	const [result, setResult] = useState<SearchResultT>();

	const possible = ["album", "artist", "playlist", "track", "show", "episode",]

	const fetchSearchResults = async () => {
		const url = "https://api.spotify.com/v1/search"
		const queryParams = (selected.length == 0) ? new URLSearchParams({
			"q": query,
			"type": possible.join(",")
		}) : new URLSearchParams({
			"q": query,
			"type": selected.join(",")
		})

		const response = await fetch(`${url}?${queryParams.toString()}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})

		const data = await response.json();
		return data;
	}

	useEffect(() => {
		const searchResults = async () => {
			setResult(await fetchSearchResults())
		}

		if (query != "")
			searchResults();
		else
			setResult(undefined);
	}, [query, selected])

	return (
		<>
			<Title name='Home' />
			<Search query={query} setQuery={setQuery} />
			<Categories selected={selected} setSelected={setSelected} possible={possible} />
			{result && <SearchResult result={result} />}
		</>
	)
}
