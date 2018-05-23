// @flow
import * as R from "ramda";
import { stringify } from "qs";

const ENDPOINT = "https://api.spotify.com";
const VERSION = "v1";
const BASE_URL = `${ENDPOINT}/${VERSION}/`;

function fetchJson(method: string, args?: Object): Promise<{}> {
  const url = buildUrl(method, args);
  return fetch(url, { headers: headers() })
    .then(res => res.json())
    .catch(error => {
      console.error(error);
      return { error };
    });
}

// SECRET, headers: arrow functions to make sure value is updated
const SECRET = () => {
  return localStorage.getItem("token") || "";
};

const headers = () =>
  new Headers({
    Accept: "application/json",
    Authorization: `Bearer ${SECRET()}`
  });

export function buildUrl(method: ?string, args?: Object): string {
  if (method) {
    const query = stringify(
      { market: "us", ...args },
      // options
      { addQueryPrefix: true }
    );
    return `${BASE_URL}${method}${query}`;
  }
  return "";
}

export const fetchArtist = async (query: ?string, args?: {}): Object =>
  fetchJson(`search`, { query, type: "artist", ...args });

// spotify artist id
export const fetchArtistAlbumsList = async (id: ?string, args?: {}): Object =>
  id ? fetchJson(`artists/${id}/albums`, { limit: 50, ...args }) : () => {};

// artist->fetchArtist.id->fetchArtistAlbumsList[]->fetchAlbum

export const fetchAlbum = async (ids?: string, args?: {}): Object =>
  fetchJson(`albums`, { ids, ...args });

export const checkLogin = async () => {
  const user = await fetchJson("me");
  // no error in user = true = isLoggedIn
  return !("error" in user);
};

export const fetchSongs = async (artist?: string, args?: {}): Object => {
  const res = await fetchArtist(artist);
  const artistObj = R.path(["artists", "items", 0], res);
  const id = artistObj
    ? typeof artistObj.id === "string"
      ? artistObj.id
      : null
    : null;
  if (id) {
    const { items = [] } = await fetchArtistAlbumsList(id);
    const ids = items.map(({ id }) => id);
    const albums: Array<any> = R.unnest(
      R.map(R.prop("albums"))(
        await Promise.all(
          R.splitEvery(20, ids).map(chunk => fetchAlbum(chunk.toString()))
        )
      )
    );
    const sortedAlbums = R.sortBy(R.prop("year"))(albums);
    const tracksByAlbums = albums.map(
      // ({
      //   name,
      //   images,
      //   items
      // })
      ({ tracks: { items = [] } }) => items
    );

    // const res = await Promise.all(tracksByAlbums);
    // return R.unnest(res);
    return tracksByAlbums;
  }
  return [];
};

export const createPlaylist = async form => {
  console.log(form);
};
