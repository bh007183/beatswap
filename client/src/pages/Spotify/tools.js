import { useSelector } from "react-redux";
import axios from "axios";
export async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function initSpotifyLogin() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", "29cca2853fe440a39cef14b5db0a9e44");
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000/spotify");
  params.append(
    "scope",
    "user-read-private user-read-email playlist-modify-private playlist-modify-public"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// spotifyApiDataCompilerLoop
// export async function spotifyGetSongsFromPlaylists(
//   allPlaylists,
//   token,
//   counter
// ) {
//   let allSongsInAPlaylist = [];

//   if (counter < allPlaylists.length) {
//     try {
//       let songs = await axios({
//         url: allPlaylists[counter].tracks.href,
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(songs);
//       try {
//         while (allSongsInAPlaylist.length < songs.data.total) {
//           if (songs.data.next === null) {
//             allSongsInAPlaylist = [...allSongsInAPlaylist, ...songs.data.items];
//           } else {
//             let newSongs = await axios({
//               url: songs.data.next,
//               method: "GET",
//               headers: { Authorization: `Bearer ${token}` },
//             });
//             allSongsInAPlaylist = [
//               ...allSongsInAPlaylist,
//               ...newSongs.data.items,
//             ];
//             songs = newSongs;
//           }
//         }
//       } catch (err) {
//         console.log(err);
//       }
//       allPlaylists[counter]["songs"] = allSongsInAPlaylist;
//       console.log(allSongsInAPlaylist);
//       console.log(allPlaylists)

//     } catch (err) {
//       console.log(err);
//     }
//     counter++;
//     // setTimeout(() => {
//       spotifyGetSongsFromPlaylists(allPlaylists, token, counter);
//     // }, 5000);
//   } 
//     return allPlaylists;
  
// }
