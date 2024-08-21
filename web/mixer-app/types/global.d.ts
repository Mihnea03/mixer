export {};

declare global {
  type ImageT = {
    url: string;
    height: number;
    width: number;
  };

  type UserT = {
    display_name: string;
    country: string;
    email: string;
    followers: {
      total: number;
    };
    external_urls: {
      spotify: string;
    };
    images: ImageT[];
    product: string;
  };

  type PlaylistListT =
    | {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: PlaylistT[];
      }
    | undefined;

  type PlaylistT = {
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageT[];
    name: string;
    owner: UserT;
    public: boolean;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
  };

  type TrackT = {
    album: AlbumT;
    artists: ArtistT[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    restrictions: {
      reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    uri: string;
    is_local: boolean;
  };

  type AlbumT = {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageT[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    uri: string;
    artists: ArtistT[];
  };

  type ArtistT = {
    external_urls: string;
    followers: {
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: ImageT[];
    name: string;
    popularity: number;
    uri: string;
  };

  type ShowT = {
    available_markets: string[];
    copyrights: {
      text: string;
      type: string;
    };
    description: string;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageT[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    uri: string;
    total_episodes: number;
  };

  type EpisodeT = {
    audio_preview_url: string;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageT[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    uri: string;
    restrictions: {
      reason: string;
    };
  };

  type AudiobookT = {
    authors: AuthorT[];
    available_markets: string[];
    copyrights: {
      text: string;
      type: string;
    };
    description: string;
    edition: string;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageT[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: {
      name: string;
    }[];
    publisher: string;
    uri: string;
    total_chapters: number;
  };

  type GenericResultT<T> = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: T[];
  };

  interface AlbumsResultT extends GenericResultT<AlbumT> {}
  interface TrackResultT extends GenericResultT<TrackT> {}
  interface ArtistsResultT extends GenericResultT<ArtistT> {}
  interface PlaylistsResultT extends GenericResultT<PlaylistT> {}
  interface ShowsResultT extends GenericResultT<ShowT> {}
  interface EpisodesResultT extends GenericResultT<EpisodeT> {}
  interface AudiobooksResultT extends GenericResultT<AudiobookT> {}

  type SearchResultT = {
    tracks: TrackResultT;
    artists: ArtistsResultT;
    albums: AlbumsResultT;
    playlists: PlaylistsResultT;
    shows: ShowsResultT;
    episodes: EpisodesResultT;
    audiobooks: AudiobooksResultT;
  };
}
