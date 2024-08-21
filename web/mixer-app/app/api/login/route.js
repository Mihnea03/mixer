import { stringify } from "querystring";
import { NextResponse } from "next/server";

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function GET() {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  const queryParams = stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
    state: state,
  });

  const redirectUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
  return NextResponse.redirect(redirectUrl);
}
