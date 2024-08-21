import React from 'react'
import TopicResult from './TopicResult'
import TrackPreview from './TrackPreview'
import AlbumPreview from './AlbumPreview'
import ArtistPreview from './ArtistPreview'
import PlaylistPreview from './PlaylistPreview'
import EpisodePreview from './EpisodePreview'
import ShowPreview from './ShowPreview'

type SearchResultProps = {
	result: SearchResultT
}

export default function SearchResult({ result }: SearchResultProps) {
	return (
		<>
			<div className='font-bold text-3xl my-8'>
				Results
			</div>
			<div className='space-y-2 w-full flex justify-center flex-col'>
				{
					result.tracks && (<TopicResult title="Tracks" items={result.tracks.items.map((track: TrackT) => {
						return <TrackPreview track={track} />
					})} />)
				}
				{
					result.albums && (<TopicResult title="Albums" items={result.albums.items.map((album: AlbumT) => {
						return <AlbumPreview album={album} />
					})} />)
				}
				{
					result.artists && (<TopicResult title="Artists" items={result.artists.items.map((artist: ArtistT) => {
						return <ArtistPreview artist={artist} />
					})} />)
				}
				{
					result.playlists && (<TopicResult title="Playlists" items={result.playlists.items.map((playlist: PlaylistT) => {
						return <PlaylistPreview playlist={playlist} />
					})} />)
				}
				{
					result.shows && (<TopicResult title="Shows" items={result.shows.items.map((show: ShowT) => {
						return <ShowPreview show={show} />
					})} />)
				}
				{
					result.episodes && (<TopicResult title="Episodes" items={result.episodes.items.map((episode: EpisodeT) => {
						return <EpisodePreview episode={episode} />
					})} />)
				}
			</div>
		</>
	)
}
