import { cookies } from "next/headers";
import LoginHandler from "./components/LoginHandler";
import { useState } from "react";

export default function Home() {
	const cookieStorage = cookies();
	const accessToken = cookieStorage.get("access_token")?.value;
	const refreshToken = cookieStorage.get("refresh_token")?.value;

	return (
		<main className="flex h-screen">
			<LoginHandler accessToken={accessToken} refreshToken={refreshToken} />
		</main>
	);
}
