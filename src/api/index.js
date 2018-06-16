// @flow
import * as R from "ramda";
import _ from "lodash";
import { stringify } from "qs";

const ENDPOINT = "https://api.spotify.com";
const VERSION = "v1";
const BASE_URL = `${ENDPOINT}/${VERSION}/`;

/**
 * SECRET, headers: arrow function to make sure value is updated
 * @returns {string}
 */
const SECRET = () => {
  return localStorage.getItem("token") || "";
};

const headers = () =>
  new Headers({
    Accept: "application/json",
    Authorization: `Bearer ${SECRET()}`
  });

function fetchJson(method, args, body = null, verb = "GET") {
  const url = buildUrl(method, args);
  return fetch(url, {
    headers: headers(),
    method: verb,
    ...(verb === "POST"
      ? {
          body: JSON.stringify(body)
        }
      : {})
  })
    .then(res => res.json())
    .catch(error => {
      console.error(error);
      return { error };
    });
}

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

/**
 * @param{string?} id - spotify artist id
 */
export const fetchArtistAlbumsList = async (id: ?string, args?: {}): Object =>
  id ? fetchJson(`artists/${id}/albums`, { limit: 50, ...args }) : () => {};

export const _createPlaylist = async (user_id, body) =>
  user_id
    ? fetchJson(`users/${user_id}/playlists`, {}, body, "POST")
    : () => {};

export const addSongsToPlaylist = async (user_id, playlist_id, body) =>
  user_id
    ? fetchJson(
        `users/${user_id}/playlists/${playlist_id}/tracks`,
        {},
        body,
        "POST"
      )
    : () => {};

// artist->fetchArtist.id->fetchArtistAlbumsList[]->fetchAlbum

export const fetchAlbum = async (ids?: string, args?: {}): Object =>
  fetchJson(`albums`, { ids, ...args });

export const checkLogin = async () => {
  const user = await fetchJson("me");
  // no error in user = true = isLoggedIn
  return !("error" in user);
};

export const fetchSongs = async (artist, args = {}) => {
  const { sort = "new" } = args;
  const include_groups = [
    "album",
    "single",
    ...Object.keys(args.includes).filter(key => {
      return args.includes[key] && key !== "live";
    })
  ].join(",");
  const res = await fetchArtist(artist);
  const artistObj = R.path(["artists", "items", 0], res);
  const id = artistObj
    ? typeof artistObj.id === "string"
      ? artistObj.id
      : null
    : null;
  if (id) {
    const { items = [] } = await fetchArtistAlbumsList(id, { include_groups });
    const ids = items.map(({ id }) => id);
    const albums: Array<any> = R.unnest(
      R.map(R.prop("albums"))(
        await Promise.all(
          R.splitEvery(20, ids).map(chunk => fetchAlbum(chunk.toString()))
        )
      )
    );
    // console.log(albums);

    // albums = args.includes.live
    //   ? albums
    //   : albums.filter(album =>
    //       !_.get(album, "name")
    //         .toLowerCase()
    //         .includes("live")
    //     );

    const order = sort === "old" ? R.ascend : R.descend;
    const sortedAlbums =
      sort === "popular"
        ? albums
        : R.sort(order(R.prop("release_date")))(albums);
        // console.log(sortedAlbums)
    const tracksByAlbums = sortedAlbums.map(
      // ({
      //   name,
      //   images,
      //   items
      // })
      ({ tracks: { items = [] } }) => items
    );

    // const res = await Promise.all(tracksByAlbums);
    // console.log(sortedAlbums);

    return R.unnest(tracksByAlbums);
  }
  return [];
};

export const createPlaylist = async form => {
  // console.log(form);
  const songs = await fetchSongs(form.artist, form);
  const { id: user_id } = await fetchJson("me");
  // console.log(user);
  // console.log(songs);
  const { id: playlist_id } = await _createPlaylist(user_id, {
    name: form.playlistName
  });
  const urisS = _.chunk(songs.map(song => song.uri), 100);
  // console.log(urisS);
  const promises = urisS.map(uris =>
    addSongsToPlaylist(user_id, playlist_id, { uris })
  );
  const res = await Promise.all(promises);
  // console.log(res);
  return res;
};
