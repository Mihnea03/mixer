import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") || null;
  const state = searchParams.get("state") || null;

  if (state === null) {
    return NextResponse.redirect(
      "/?" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI;

  const body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: body.toString(),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    if (response.ok) {
      // Set tokens in cookies
      const accessTokenCookie = serialize("access_token", data.access_token, {
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });

      const refreshTokenCookie = serialize(
        "refresh_token",
        data.refresh_token,
        {
          httpOnly: true,
          maxAge: 3600 * 24 * 30,
          path: "/",
        }
      );

      const res = NextResponse.redirect("http://localhost:3000/");
      res.headers.set("Set-Cookie", accessTokenCookie);
      res.headers.append("Set-Cookie", refreshTokenCookie);

      return res;
    } else {
      // Handle error returned by Spotify
      console.error("Error fetching access token:", data);
      return NextResponse.redirect("http://localhost:3000?error=invalid_token");
    }
  } catch (error) {
    console.error("Network error:", error);
    return NextResponse.redirect("http://localhost:3000?error=network_error");
  }
}
