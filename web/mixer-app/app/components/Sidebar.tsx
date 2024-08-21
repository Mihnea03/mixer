import React, { useEffect, useState } from "react";
import Account from "./Account";
import SidebarAction from "./SidebarAction";
import Playlists from "./Playlists";
import Search from "./Search";
import Home from "./Home";

type SidebarProps = {
	user: UserT
	accessToken: string
	setCurrPage: React.Dispatch<React.SetStateAction<React.JSX.Element | undefined>>
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Sidebar = ({ user, setCurrPage, accessToken, query, setQuery }: SidebarProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const [locked, setLocked] = useState(false);

	const actions = [
		{
			actionName: "Home",
			action: () => setCurrPage(<Home query={query} setQuery={setQuery} accessToken={accessToken} />)
		}, {
			actionName: "Account",
			action: () => { setCurrPage(<Account user={user} />); }
		}, {
			actionName: "My Playlists",
			action: () => { setCurrPage(<Playlists accessToken={accessToken} user={user} />); }
		}
	]

	let bestImage = {
		url: "",
		width: 50,
		height: 50
	};
	if (user) {
		bestImage = user.images.length >= 2 ? user.images[1] : user.images[0];
	}

	useEffect(() => {
		setCurrPage(<Home query={query} setQuery={setQuery} accessToken={accessToken} />);
	}, [query]);

	return (
		<div
			className={`fixed  z-10 bg-gray-900 text-white h-full transition-all ease-in-out duration-300 ${isOpen ? "w-64" : "w-14"
				}`}
			onMouseEnter={() => !locked && setIsOpen(true)}
			onMouseLeave={() => !locked && setIsOpen(false)}
		>
			<button
				className="p-4 text-center text-white hover:bg-gray-800 bg-gra"
				onClick={() => setLocked(!locked)}
			>
				{locked ? "🔒" : "🔓"}
			</button>
			{isOpen &&
				<>
					{user &&
						<div className="p-2 flex items-center self-center mt-5 hover:bg-gray-800 transition ease-in-out delay-50" onClick={() => setCurrPage(<Account user={user} />)}>
							<button className="hover:opacity-50 transition ease-in-out delay-50">
								<img className="sticky rounded-full origin-center w-16 h-16" src={bestImage.url} width={48} height={48} />
							</button>
							<div className="flex-grow ml-5">
								<h1 className="text-xl">{user.display_name}</h1>
								<h1 className="text-xs">{user.country}</h1>
							</div>
						</div>
					}
					<Search query={query} setQuery={setQuery} />
					<nav className={`flex flex-col p-1 space-y-2 mt-10 ${!isOpen && "hidden md:block"}`}>
						{
							actions.map((action, index) => {
								return <SidebarAction actionName={action.actionName} action={action.action} key={index} />
							})
						}
					</nav>
				</>
			}
		</div >
	);
};

export default Sidebar;
